import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import watch from './watch';

export default () => {
  return {
    cmd: 'watch',
    desc: 'watch your app for changes and rebuild',
    aliases: ['w'],
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
        return watch(config);
      }
      throwError('No config file found');
    }
  };
};
