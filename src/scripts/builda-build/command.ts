import { getConfig, throwError } from 'helpers';
import yargs from 'yargs';

import buildaBuild from './build';

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'build',
    desc: 'Build your project',
    aliases: ['-b', '--build'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async () => {
      const config = await getConfig();
      if (config) {
        return buildaBuild({
          config
        });
      }
      throwError('No config file found');
    }
  };
};
