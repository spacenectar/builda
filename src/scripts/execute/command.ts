import yargs from 'yargs';
import execute from './execute';

import getConfigFile from '@helpers/get-config-file';
import printMessage from '@helpers/print-message';
import throwError from '@helpers/throw-error';

export default () => {
  return {
    cmd: 'execute <command>',
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
        return execute({ config, command: argv.command });
      }
      throwError('No config file found');
    }
  };
};
