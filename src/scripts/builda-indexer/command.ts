import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';

import buildaIndexer from './indexer';

export default () => {
  return {
    cmd: 'indexer',
    desc: 'Generate an index file for the specified directories',
    aliases: ['index'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async (argv: any) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaIndexer(config);
      }
      throwError('No config file found');
    }
  };
};
