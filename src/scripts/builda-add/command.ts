import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';
import globals from 'data/globals';

import buildaAdd from './add';
import chalk from 'chalk';

const { websiteUrl } = globals;

export default () => {
  return {
    command: `${chalk.green('add')} ${chalk.blue('<blueprintPath>')}`,
    desc: chalk.white('Adds a new blueprint'),
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('blueprintPath', {
          describe: `The path to the blueprint (can be a resolver - see http://${websiteUrl}/docs/resolvers)`,
          type: 'string',
          demandOption: true
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
        return buildaAdd({ config, modulePath: argv.blueprintPath });
      }
      throwError('No config file found');
    }
  };
};
