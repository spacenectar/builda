import { throwError } from 'helpers';
import { ConfigFile } from 'types/config-file';

export const generateCommands = (config: ConfigFile): ConfigFile['scripts'] => {
  if (config.scripts) {
    const commands = {} as ConfigFile['scripts'];
    const scriptArray = Object.entries(config.scripts);

    scriptArray.forEach((script) => {
      const name = script[0];
      commands![name] = script[1];
    });
    return commands;
  } else {
    return throwError('No "scripts" entry found in config file');
  }
};

export default generateCommands;
