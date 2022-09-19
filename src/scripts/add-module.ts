import fs from 'node:fs';
import path from 'node:path';

// Import helpers
import {
  detectPathType,
  throwError,
  addLocalModule,
  addRemoteModule,
  createDir,
  convertRegistryPathToUrl,
  printMessage
} from '@helpers';

// Import data
import globals from '@data/globals';

// Import types
import ModuleRegistry from '@typedefs/module-registry';

// Import ignorefile

import changeCase from '@helpers/string-functions';
import { ConfigFile } from '@typedefs/config-file';

export type AddModulesResponse = {
  module: ModuleRegistry;
  config: ConfigFile;
};

export const addModule = async ({
  config,
  modulePath,
  update = false,
  outputDir
}: {
  config: ConfigFile;
  modulePath: string;
  update?: boolean;
  outputDir?: string;
}): Promise<AddModulesResponse> => {
  let module = {} as ModuleRegistry;
  if (config) {
    const outputPath = outputDir || config.app_root || './';
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = path.join(outputPath, globals.buildaDir, 'modules');

    await createDir(moduleDirPath);

    const moduleType = detectPathType(modulePath);

    if (moduleType === 'local') {
      module = await addLocalModule(modulePath);
    }

    if (moduleType === 'remote') {
      module = await addRemoteModule(
        convertRegistryPathToUrl(modulePath, config)
      );
    }

    if (moduleType === 'custom') {
      module = await addRemoteModule(
        convertRegistryPathToUrl(modulePath, config)
      );
    }

    if (module?.name) {
      const type = module.type;
      const name = module.name;
      const version = module.version;

      if (type === 'blueprint') {
        // User has never installed any blueprints.
        if (!config?.blueprints) {
          config.blueprints = {};
        }
        // User has installed this blueprint before.
        if (config?.blueprints?.[name] && !update) {
          throwError(
            `Blueprint already installed, perhaps you meant 'builda update ${name}?'`
          );
        } else {
          // User has never installed this blueprint before.
          config.blueprints[name] = {
            version,
            location: modulePath
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
            location: modulePath,
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
