import { getConfig, throwError } from 'helpers';
import yargs from 'yargs';

import buildaBuild from './build';

type Args = {
  configPath: string;
  onlyPath: string;
};

export default () => {
  return {
    command: 'build',
    desc: 'Build your project',
    aliases: ['-b', '--build'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs
        .option('onlyPath', {
          describe: 'If you want to build from a specific path',
          type: 'string',
          default: ''
        })
        .option('configPath', {
          aliases: ['c', 'config'],
          default: '',
          describe: 'The path to a config file',
          type: 'string'
        });
    },
    handler: async (argv: Args) => {
      const config = await getConfig();
      if (config) {
        return buildaBuild({
          config,
          onlyPath: argv.onlyPath
        });
      }
      throwError('No config file found');
    }
  };
};
