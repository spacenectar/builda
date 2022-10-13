import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import buildaUpdate from './update';

type Args = {
  configPath: string;
  // TODO: It might be better to make this optional and then just update all modules if it's not provided
  moduleName: string;
};

export default () => {
  return {
    command: 'update <moduleName>',
    desc: 'update a module',
    aliases: ['u'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs
        .positional('moduleName', {
          describe: 'The name of the module',
          type: 'string',
          demandOption: true
        })
        .option('configPath', {
          aliases: ['c', 'config'],
          default: '',
          describe: 'The path to a config file',
          type: 'string'
        });
    },
    handler: async (argv: Args) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaUpdate({
          config,
          module: argv.moduleName
        });
      }
      throwError('No config file found');
    }
  };
};
