#! /usr/bin/env node

import axios from 'axios';
import fs from 'fs';
import yaml from 'js-yaml';

// Import helpers
import {
  getConfigFile,
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
  filteredFiles.forEach((file: string) => {
    const srcPath = `${modulePath}/${file}`;
    const outputPath = `${globals.buildaDir}/modules/${registry.type}/${registry.name}`;
    createDir(outputPath).then(() => {
      fs.copyFileSync(srcPath, `${outputPath}/${file}`);
    });
  });
  return registry;
};

const addRemoteModule = async (modulePath: string): Promise<ModuleRegistry> => {
  // get the directory contents
  const registry = await getRegistry(modulePath);
  const files = [...registry.files, 'registry.yaml'];
  files
    .filter((file: string) => !ignoreFiles.includes(file))
    .forEach((file: string) => {
      // Download the file
      axios
        .get(`${modulePath}/${file}`)
        .then((response) => {
          const fileObject = {
            name: file,
            content: response.data
          };
          const outputPath = `${globals.buildaDir}/modules/${registry.type}/${registry.name}`;
          createDir(outputPath).then(() => {
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

export const addModule = async ({
  path, official
} : { path: string, official?:boolean}) => {
  const config = getConfigFile();
  if (config) {
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = `${globals.buildaDir}/modules`;

    const newPath = official ? `${globals.repoUrl}/scaffolds/${path}` : path;

    await createDir(moduleDirPath).then(async () => {
      const moduleType = detectPathType(newPath);
      let module;
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
        if (!config.modules) {
          config.modules = {};
        }

        if (type === 'scaffold') {
          // User has never installed any scaffolds.
          if (!config?.modules?.scaffold) {
            config.modules.scaffold = {};
          }
          const scaffolds = config.modules.scaffold;
          scaffolds[name] = version;
        }
        if (type === 'prefab') {
          // User has never installed any prefabs.
          if (!config?.modules?.prefab) {
            config.modules.prefab = {};
          }
          const prefabs = config.modules.prefab;
          prefabs[name] = version;
        }

        // Write the config file
        fs.writeFileSync(
          globals.configFileName,
          yaml.dump(config, { indent: 2 })
        );
        return printMessage(
          `${changeCase(type, 'pascal')}: ${name}@${version} installed`,
          'success'
        );
      }
    });
  }
};

export default addModule;
