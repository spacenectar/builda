import fs from 'node:fs';
import globals from 'data/globals';
import {
  addLocalModule,
  addRemoteModule,
  convertRegistryPathToUrl,
  detectPathType,
  printMessage
} from 'helpers/index';
import changeCase from 'helpers/string-functions';
import throwError from 'helpers/throw-error';
import { ConfigFile } from 'types/config-file';
import ModuleRegistry from 'types/module-registry';

export default async ({
  config,
  module
}: {
  config: ConfigFile;
  module: string;
}) => {
  const moduleName = module.split('@')[0];
  const moduleVersion = module.split('@')[1] || 'latest';

  if (!moduleName) {
    throwError('You must specify a module name');
  }

  let foundModule = null;

  if (config.prefab) {
    const splitString = config.prefab.split('@');
    foundModule = {
      location: config.prefab,
      version: splitString ? splitString[1] : ''
    };
  }

  if (config.blueprints && config.blueprints[moduleName]) {
    foundModule = config.blueprints[moduleName];
  }

  if (foundModule) {
    const modulePath = foundModule.location;
    const localVersion = foundModule.version;

    const requestVersion = `${modulePath.split('@')[0]}@${moduleVersion}`;

    if (
      moduleVersion &&
      moduleVersion === localVersion &&
      localVersion !== ''
    ) {
      throwError(`Module ${moduleName} is already at version ${localVersion}`);
    }

    const moduleType = detectPathType(requestVersion);

    let newmodule = {} as ModuleRegistry;

    const url = convertRegistryPathToUrl({
      registryPath: requestVersion,
      config
    }) as string;

    // TODO: Add documentation for custom resolvers
    if (!url) {
      throwError(
        `Could not find resolver for ${requestVersion} in the registry. Please check the URL and try again.`
      );
    }

    if (moduleType === 'local') {
      newmodule = await addLocalModule(requestVersion);
    }

    if (moduleType === 'remote') {
      newmodule = await addRemoteModule(url);
    }

    if (moduleType === 'custom') {
      newmodule = await addRemoteModule(url);
    }

    if (newmodule?.name) {
      const type = newmodule.type;
      const name = newmodule.name;
      const version = newmodule.version;

      const newConfig = config.default!;

      if (type === 'blueprint') {
        newConfig.blueprints[name] = {
          location: requestVersion,
          version
        };
      }

      if (type === 'prefab') {
        newConfig.prefab = modulePath.split('@')[0];
      }

      return fs.writeFile(
        globals.configFileName,
        JSON.stringify(newConfig, null, 2),
        (err) => {
          if (err) {
            throwError(err.message);
          }
          printMessage(
            `${changeCase(
              type,
              'pascal'
            )}: '${name}' updated to version '${version}'`,
            'success'
          );
        }
      );
    }
  } else {
    throwError(
      `Module ${moduleName} not found in config. Perhaps you meant to run 'builda add ${module}'?`
    );
  }

  throwError(`Module ${module} not found in config`);
};
