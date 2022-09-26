import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';
import globals from 'data/globals';

import buildaInstall from './install';
import chalk from 'chalk';

const { websiteUrl } = globals;

export default () => {
  return {
    command: `${chalk.green('install')} ${chalk.blue('<modulePath>')}`,
    desc: chalk.white('Adds a new blueprint'),
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('modulePath', {
          describe: `The path to the module (can be a resolver - see http://${websiteUrl}/docs/resolvers)`,
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
        return buildaInstall({ config });
      }
      throwError(
        `No config file found. Run 'builda init' (http://${websiteUrl}/docs/initialise-a-project) to create one or 'builda project' to generate a new project from a prefab (http://${websiteUrl}/docs/prefabs).`
      );
    }
  };
};
