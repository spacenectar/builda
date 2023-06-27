import yargs from 'yargs';

import globals from 'data/globals';

import buildaAdd from './add';

const { websiteUrl } = globals;

type Args = {
  blueprintPath: string;
};

export default () => {
  return {
    command: 'add <blueprintPath>',
    desc: 'Adds a new blueprint',
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs
        .positional('blueprintPath', {
          describe: `The path to the blueprint (can be a resolver - see http://${websiteUrl}/docs/resolvers)`,
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
      return buildaAdd({ modulePath: argv.blueprintPath });
    }
  };
};
