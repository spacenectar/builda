#! /usr/bin/env node

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
      // Download the file
      await axios
        .get(`${modulePath}/${file}`)
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
  config: Partial<ConfigFile>;
};

export const addModule = async ({
  config,
  path,
  official
}: {
  config: Partial<ConfigFile>;
  path: string;
  official?: boolean;
}): Promise<AddModulesResponse> => {
  let module = {} as ModuleRegistry;
  if (config) {
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = `${globals.buildaDir}/modules`;

    const newPath = official ? `${globals.websiteUrl}/modules/${path}` : path;

    await createDir(moduleDirPath);

    const moduleType = detectPathType(newPath);

    if (moduleType === 'local') {
      module = await addLocalModule(newPath);
    }

    if (moduleType === 'remote') {
      module = await addRemoteModule(convertRegistryPathToUrl(newPath));
    }

    if (module?.name) {
      const type = module.type;
      const name = module.name;
      const version = module.version;

      // User has never installed any modules.
      if (!config.scaffold_scripts) {
        config.scaffold_scripts = {};
      }

      if (type === 'scaffold') {
        // User has never installed any scaffolds.
        if (!config?.scaffolds) {
          config.scaffolds = {};
        }
      }
      if (type === 'prefab') {
        // User has never installed any prefabs.
        if (!config?.prefabs) {
          config.prefabs = {};
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
            `${changeCase(type, 'pascal')}: ${name}@${version} installed`,
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
