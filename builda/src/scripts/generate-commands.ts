import { getConfigFile, getModule } from '@helpers';
import type CommandConfig from '@typedefs/command-config';

export const generateCommands = async (): Promise<CommandConfig[]> => {
  const config = getConfigFile();
  const commands: Promise<CommandConfig>[] = [];
  if (config) {
    Object.keys(config.commands).forEach((command) => {
      commands.push(new Promise((resolve) => {
        const { use, outputPath, substitute } = config.commands[command];
        const { registry } = getModule(config, config.commands[command]);
        resolve({
          name: command,
          type: registry.type,
          use,
          outputPath,
          substitute
        });
      }));
    });
    return Promise.all(commands);
  } else {
    return Promise.reject(`Could not find config file`);
  }
};

export default generateCommands;
