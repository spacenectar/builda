import path from 'node:path';
import process from 'node:process';

// Import helpers
import {
  detectPathType,
  throwError,
  addLocalModule,
  addRemoteModule,
  createDir,
  getConfig,
  updateConfig,
  convertRegistryPathToUrl,
  printMessage
} from 'helpers';

// Import data
import globals from 'data/globals';

// Import types
import ModuleRegistry from 'types/module-registry';

export type AddModulesResponse = {
  module: ModuleRegistry;
};

export default async ({
  modulePath,
  fromScript
}: {
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
  const config = getConfig();
  const outputPath = process.cwd();
  // Check the module directory exists and create it if it doesn't
  const moduleDirPath = path.join(outputPath, globals.buildaDir, 'modules');

  const moduleList = modulePath.includes(' ')
    ? modulePath.split(' ')
    : [modulePath];

  await createDir(moduleDirPath);

  for (const currentModule of moduleList) {
    if (detectPathType(currentModule) === 'remote') {
      const registry = convertRegistryPathToUrl({
        registryPath: currentModule
      }).url;
      if (!registry) {
        throwError('No registry found');
      }
      module = await addRemoteModule(registry);
    } else {
      module = await addLocalModule(currentModule);
    }

    /**
     * The following should only run if the command is being run directly from the CLI or
     * if the command is being run from a script and the module is being added to the project config
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
              location: currentModule
            };
          }
        }
        if (type === 'prefab') {
          // User has added this prefab before.
          throwError(
            `You cannot add a prefab as a module. A prefab is used to set up a new project. Try 'builda project' instead.`
          );
        }

        // Update the config file
        updateConfig(config);
        printMessage(`Added ${name} to your project`, 'success');
      } else {
        throwError('Something went wrong');
      }
    }
  }
};
