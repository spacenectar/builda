import { ConfigFile } from 'types/config-file';

export const generateCommands = (
  config: ConfigFile
): ConfigFile['blueprint_scripts'] => {
  const commands = {} as ConfigFile['blueprint_scripts'];
  Object.entries<ConfigFile['blueprint_scripts']>(
    config.blueprint_scripts
  ).forEach((script) => {
    const name = script[0];
    const { use, output_dir } = script[1];
    commands[name] = { use, output_dir };
  });
  return commands;
};

export default generateCommands;
