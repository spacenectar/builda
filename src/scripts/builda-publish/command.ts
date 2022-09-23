import chalk from 'chalk';
import yargs from 'yargs';

import buildaPublish from './publish';

export default () => {
  return {
    command: chalk.green('publish'),
    desc: chalk.white('publish a module'),
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
