import { throwError } from 'helpers';
import { ConfigFile } from 'types/config-file';

export const generateCommands = (config: ConfigFile): ConfigFile['scripts'] => {
  if (config.scripts) {
    const commands = {} as ConfigFile['scripts'];
    const scriptArray = Object.entries(config.scripts);

    scriptArray.forEach((script) => {
      const name = script[0];
      const { use, outputDir } = script[1];
      commands![name] = { use, outputDir };
    });
    return commands;
  } else {
    return throwError('No "scripts" entry found in config file');
  }
};

export default generateCommands;
