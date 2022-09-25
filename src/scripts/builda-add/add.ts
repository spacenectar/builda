import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Import helpers
import {
  detectPathType,
  throwError,
  addLocalModule,
  addRemoteModule,
  createDir,
  convertRegistryPathToUrl,
  printMessage,
  changeCase
} from 'helpers';

// Import data
import globals from 'data/globals';

// Import types
import ModuleRegistry from 'types/module-registry';
import { ConfigFile } from 'types/config-file';

export type AddModulesResponse = {
  module: ModuleRegistry;
  config: ConfigFile;
};

export default async ({
  config,
  modulePath,
  fromScript
}: {
  /**
   * The project config
   */
  config: ConfigFile;
  /**
   * The path to the module to add
   */
  modulePath: string;
  /**
   * Whether the command is being run from a script or directly from the CLI
   */
  fromScript?: boolean;
}) => {
  let module = {} as ModuleRegistry;
  const outputPath = process.cwd();
  // Check the module directory exists and create it if it doesn't
  const moduleDirPath = path.join(outputPath, globals.buildaDir, 'modules');

  await createDir(moduleDirPath);

  if (detectPathType(modulePath) === 'remote') {
    const registry = convertRegistryPathToUrl({
      registryPath: modulePath,
      config
    }).url;
    if (!registry) {
      throwError('No registry found');
    }
    module = await addRemoteModule(registry);
  } else {
    module = await addLocalModule(modulePath);
  }

  /**
   * The following should only run if the command is being run directly from the CLI
   */
  if (!fromScript) {
    if (module?.name) {
      const type = module.type;
      const name = module.name;
      const version = module.version;

      if (type === 'blueprint') {
        // User has never added any blueprints.
        if (!config?.blueprints) {
          config.blueprints = {};
        }
        // User has added this blueprint before.
        if (config?.blueprints?.[name]) {
          throwError(
            `A blueprint called ${name} already exists. Perhaps you meant 'builda update ${name}?'`
          );
        } else {
          // User has never added this blueprint before.
          config.blueprints[name] = {
            version,
            location: modulePath
          };
        }
      }
      if (type === 'prefab') {
        // User has added this prefab before.
        throwError(
          `You cannot add a prefab as a module. A prefab is used to set up a new project. Try 'builda project' instead.`
        );
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
            `${changeCase(type, 'pascal')}: '${name}@${version}' added`,
            'success'
          );
        }
      );
    } else {
      throwError('Something went wrong');
    }
  }
};
