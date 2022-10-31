import { replaceRootDir, throwError } from 'helpers';
import { ConfigFile } from 'types/config-file';

export const generateCommands = (
  config: ConfigFile
): ConfigFile['blueprintScripts'] => {
  if (config.blueprintScripts) {
    const commands = {} as ConfigFile['blueprintScripts'];
    const scriptArray = Object.entries(config.blueprintScripts);

    scriptArray.forEach((script) => {
      const name = script[0];
      const { use, outputDir } = script[1];
      const updatedOutputDir = replaceRootDir(outputDir, config);
      commands![name] = { use, outputDir: updatedOutputDir };
    });
    return commands;
  } else {
    return throwError('No "blueprintScripts" entry found in config file');
  }
};

export default generateCommands;
