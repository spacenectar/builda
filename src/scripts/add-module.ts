import fs from 'fs';

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
