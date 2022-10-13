import yargs from 'yargs';
import buildaExecute from './execute';

import { getConfigFile, throwError } from 'helpers';

export default () => {
  return {
    command: 'execute <command>',
    desc: 'Execute a command from within the export directory',
    aliases: ['x', 'exec'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('command', {
          describe: 'The name of the command',
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
    handler: async (argv: any) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaExecute({ config, command: argv.command });
      }
      throwError('No config file found');
    }
  };
};
