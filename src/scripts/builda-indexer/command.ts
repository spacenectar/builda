import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';

import buildaIndexer from './indexer';

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'indexer',
    desc: 'Generate an index file for the specified directories',
    aliases: ['index'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async (argv: Args) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaIndexer(config);
      }
      throwError('No config file found');
    }
  };
};
