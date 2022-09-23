import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import buildaUpdate from './update';

export default () => {
  return {
    cmd: 'update <module>',
    desc: 'update a module',
    aliases: ['u'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('module', {
          describe: 'The name of the module',
          type: 'string'
        })
        .option('configPath', {
          aliases: ['c', 'config'],
          default: '',
          describe: 'The path to a config file',
          type: 'string'
        });
    },
    handler: async (argv: any) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaUpdate({
          config,
          module: argv.module
        });
      }
      throwError('No config file found');
    }
  };
};
