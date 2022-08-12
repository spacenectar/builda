import { getConfigFile, getModule } from '@helpers';

const config = getConfigFile();

export const generateCommands = () => {
  if (config) {
    return Object.keys(config.commands).map((command) => {
      const { use, outputPath, substitute } = config.commands[command];

      const { registry } = getModule(use);

      return {
        name: command,
        type: registry.type,
        use,
        outputPath,
        substitute
      };
    });
  } else {
    throw new Error('No config file found');
  }
};

export default generateCommands;
