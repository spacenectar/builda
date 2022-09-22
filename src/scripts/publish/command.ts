import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';
import globals from 'data/globals';

import publish from './publish';

const { websiteUrl } = globals;

export default () => {
  return {
    cmd: 'publish',
    desc: 'publish a module',
    aliases: ['i'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs.option('version', {
        aliases: ['v', 'ver'],
        default: '',
        describe: 'update module version (semver)',
        type: 'string'
      });
    },
    handler: async (argv: any) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return publish(argv.version);
      }
      throwError('No config file found');
    }
  };
};
