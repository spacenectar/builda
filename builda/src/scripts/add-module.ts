import axios from 'axios';
import fs from 'fs';

// Import helpers
import {
  detectPathType,
  throwError,
  getRegistry,
  createDir,
  convertRegistryPathToUrl,
  printMessage
} from '@helpers';

// Import data
import globals from '@data/globals';

// Import types
import ModuleRegistry from '@typedefs/module-registry';

// Import ignorefile
import ignoreFile from '@data/ignore-file.json';
import changeCase from '@helpers/string-functions';
import { ConfigFile } from '@typedefs/config-file';

// Ignore these files
const ignoreFiles = ignoreFile.ignore;

const addLocalModule = async (modulePath: string): Promise<ModuleRegistry> => {
  // get the registry data
  const registry = await getRegistry(modulePath);
  // get the directory contents
  const files = fs.readdirSync(modulePath);
  // filter out the ignore files
  const filteredFiles = files.filter(
    (file: string) => !ignoreFiles.includes(file)
  );
  // write the files to the output directory
  filteredFiles.forEach(async (file: string) => {
    const srcPath = `${modulePath}/${file}`;
    const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;
    await createDir(outputPath).then(() => {
      fs.copyFileSync(srcPath, `${outputPath}/${file}`);
    });
  });
  return registry;
};

const addRemoteModule = async (modulePath: string): Promise<ModuleRegistry> => {
  // get the directory contents
  const registry = await getRegistry(modulePath);
  const files = [...registry.files, 'registry.json'];
  files
    .filter((file: string) => !ignoreFiles.includes(file))
    .forEach(async (file: string) => {
      const srcPath =
        file === 'registry.json'
          ? `${modulePath}/${file}`
          : `${modulePath}/files/${file}`;
      // Download the file
      await axios
        .get(srcPath)
        .then((response) => {
          const content =
            file === 'registry.json'
              ? JSON.stringify(response.data, null, 2)
              : response.data.toString();

          const fileObject = {
            name: file,
            content
          };
          const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;
          return createDir(outputPath).then(() => {
            return fs.writeFileSync(
              `${outputPath}/${fileObject.name}`,
              fileObject.content
            );
          });
        })
        .catch((error) => {
          throwError(error);
        });
    });
  return registry;
};

export type AddModulesResponse = {
  module: ModuleRegistry;
  config: ConfigFile;
};

export const addModule = async ({
  config,
  path,
  update = false
}: {
  config: ConfigFile;
  path: string;
  update?: boolean;
}): Promise<AddModulesResponse> => {
  let module = {} as ModuleRegistry;
  if (config) {
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = `${globals.buildaDir}/modules`;

    await createDir(moduleDirPath);

    const moduleType = detectPathType(path);

    if (moduleType === 'local') {
      module = await addLocalModule(path);
    }

    if (moduleType === 'remote') {
      module = await addRemoteModule(convertRegistryPathToUrl(path, config));
    }

    if (moduleType === 'custom') {
      module = await addRemoteModule(convertRegistryPathToUrl(path, config));
    }

    if (module?.name) {
      const type = module.type;
      const name = module.name;
      const version = module.version;

      if (type === 'scaffold') {
        // User has never installed any scaffolds.
        if (!config?.scaffolds) {
          config.scaffolds = {};
        }
        // User has installed this scaffold before.
        if (config?.scaffolds?.[name] && !update) {
          throwError(
            `Scaffold already installed, perhaps you meant 'builda update ${name}?'`
          );
        } else {
          // User has never installed this scaffold before.
          config.scaffolds[name] = {
            version,
            location: path
          };
        }
      }
      if (type === 'prefab') {
        // User has never installed any prefabs.
        if (!config?.prefabs) {
          config.prefabs = {};
        }
        // User has installed this prefab before.
        if (config?.prefabs?.[name] && !update) {
          throwError(
            `Prefab already installed, perhaps you meant 'builda update ${name}?'`
          );
        } else {
          // User has never installed this prefab before.
          config.prefabs[name] = {
            version,
            location: path,
            output_dir: '{{app_root}}'
          };
        }
      }

      // Write the config file
      fs.writeFile(
        globals.configFileName,
        JSON.stringify(config, null, 2),
        (err) => {
          if (err) {
            throwError(err.message);
          }
          printMessage(
            `${changeCase(type, 'pascal')}: '${name}@${version}' installed`,
            'success'
          );
        }
      );
      return {
        module,
        config
      };
    }
    return throwError('Something went wrong');
  }
  return throwError('No config file found');
};

export default addModule;
