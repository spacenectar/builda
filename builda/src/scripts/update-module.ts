import throwError from '@helpers/throw-error';
import { ConfigFile } from '@typedefs/config-file';
import addModule from './add-module';

export const updateModule = async ({
  config,
  module
}: {
  config: ConfigFile;
  module: string;
}) => {
  const moduleName = module.split('@')[0];
  const moduleVersion = module.split('@')[1];

  if (!moduleName) {
    throwError('You must specify a module name');
  }

  let foundModule = null;

  if (config.prefabs && config.prefabs[moduleName]) {
    foundModule = config.prefabs[moduleName];
  }

  if (config.scaffolds && config.scaffolds[moduleName]) {
    foundModule = config.scaffolds[moduleName];
  }

  if (!foundModule) {
    return throwError(
      `Module ${module} not found in config. Perhaps you meant to run 'builda add ${module}'?`
    );
  }

  const localVersion = foundModule.version;

  if (moduleVersion && moduleVersion === localVersion) {
    return throwError(`Module ${module} is already at version ${localVersion}`);
  }

  const updatedModule = await addModule({
    config,
    path: foundModule.location,
    update: true
  });

  return updatedModule;
};
