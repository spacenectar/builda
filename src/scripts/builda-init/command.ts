import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import buildaInit from './init';

export default () => {
  return {
    cmd: 'init',
    desc: 'Initialise builda',
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async (argv: any) => {
      const config = await getConfigFile();
      if (!config) {
        return buildaInit();
      }
      throwError('A builda config already exists.');
    }
  };
};
