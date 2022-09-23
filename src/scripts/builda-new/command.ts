import chalk from 'chalk';
import { getConfigFile, throwError } from 'helpers';
import yargs from 'yargs';

import buildaNew from './new';

export default () => {
  return {
    command: `${chalk.green('new')} ${chalk.blue('<scriptName>')}`,
    desc: chalk.white('Create something new from a blueprint'),
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('scriptName', {
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
          scriptName: argv.scriptName,
          name: argv.name
        });
      }
      throwError('No config file found');
    }
  };
};
