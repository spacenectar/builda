import yargs from 'yargs';
import buildaExecute from './execute';

type Args = {
  command: string;
  args?: string;
};

export default () => {
  return {
    command: 'execute <command>',
    desc: 'Execute a command from within the export directory',
    aliases: ['x', 'exec'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.positional('command', {
        describe: 'The name of the command',
        type: 'string',
        demandOption: true
      });
    },
    handler: async (argv: Args) => {
      return buildaExecute({ command: argv.command, args: argv });
    }
  };
};
