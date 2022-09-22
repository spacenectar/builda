import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import update from './update';

export default () => {
  return {
    cmd: 'update <modulePath>',
    desc: 'update a module',
    aliases: ['u'],
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
        return update(argv.version);
      }
      throwError('No config file found');
    }
  };
};
