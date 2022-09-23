import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import buildaNew from './new';

export default () => {
  return {
    cmd: 'new <script> <name>',
    desc: 'Create something new from a blueprint',
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('script', {
          describe: 'The scaffold script to run',
          type: 'string'
        })
        .positional('name', {
          describe: 'The name of the new thing',
          type: 'string'
        })
        .option('subString', {
          aliases: ['s', 'sub'],
          default: '',
          describe:
            'A string matcher for the blueprint script. e.g: "%MY_STRING%:\'new string\'"',
          type: 'string'
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
        return buildaNew({
          config,
          script: argv.script,
          name: argv.name
        });
      }
      throwError('No config file found');
    }
  };
};
