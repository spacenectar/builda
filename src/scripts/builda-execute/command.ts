import yargs from 'yargs';
import buildaExecute from './execute';

type Args = {
  configPath: string;
  command: string;
};

export default () => {
  return {
    command: 'execute <command>',
    desc: 'Execute a command from within the export directory',
    aliases: ['x', 'exec'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
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
    handler: async (argv: Args) => {
      return buildaExecute({ command: argv.command });
    }
  };
};
