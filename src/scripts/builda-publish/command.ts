import yargs from 'yargs';

import buildaPublish from './publish';

export default () => {
  return {
    command: 'publish',
    desc: 'publish a module',
    aliases: ['pub', 'push'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs.option('version', {
        aliases: ['v', 'ver'],
        default: '',
        describe: 'update module version (semver)',
        type: 'string'
      });
    },
    handler: async (argv: any) => {
      return buildaPublish(argv.version);
    }
  };
};
