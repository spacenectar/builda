import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import buildaBuild from './build';

export default () => {
  return {
    cmd: 'build',
    desc: 'Build your project',
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .option('prod', {
          aliases: ['p', 'production'],
          default: '',
          describe:
            'Build for production. This will minify the output and remove any debug code',
          type: 'boolean'
        })
        .option('configPath', {
          aliases: ['c', 'config'],
          default: '',
          describe: 'The path to a config file',
          type: 'string'
        });
    },
    handler: async (argv: any) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaBuild({
          config,
          prod: argv.prod
        });
      }
      throwError('No config file found');
    }
  };
};
