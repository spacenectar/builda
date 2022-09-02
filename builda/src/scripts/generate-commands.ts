import { ConfigFile } from '@typedefs/config-file';

export const generateCommands = (
  config: ConfigFile
): ConfigFile['scaffold_scripts'] => {
  const commands = {} as ConfigFile['scaffold_scripts'];
  if (config) {
    Object.entries<ConfigFile['scaffold_scripts']>(
      config.scaffold_scripts
    ).forEach((script) => {
      const name = script[0];
      const { use, output_dir, substitute } = script[1];
      commands[name] = { use, output_dir, substitute };
    });
    return commands;
  } else {
    throw new Error('No config file found');
  }
};

export default generateCommands;
