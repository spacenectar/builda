import { getConfigFile } from '@helpers';

const config = getConfigFile();

export const generateCommands = () => {
  if (config) {
    return Object.keys(config.commands);
  } else {
    throw new Error('No config file found');
  }
};

export default generateCommands;
