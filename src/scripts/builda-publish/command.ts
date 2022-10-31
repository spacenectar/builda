import yargs from 'yargs';

import buildaPublish from './publish';

type Args = {
  version: string;
};

export default () => {
  return {
    command: 'publish',
    desc: 'publish a module',
    aliases: ['pub', 'push'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('version', {
        aliases: ['v', 'ver'],
        default: '',
        describe: 'update module version (semver)',
        type: 'string'
      });
    },
    handler: async (argv: Args) => {
      return buildaPublish(argv.version);
    }
  };
};
