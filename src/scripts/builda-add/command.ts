import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';
import globals from 'data/globals';

import buildaAdd from './add';

const { websiteUrl } = globals;

export default () => {
  return {
    cmd: 'add <modulePath>',
    desc: 'add a module',
    aliases: ['i'],
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
        return buildaAdd({ config, modulePath: argv.modulePath });
      }
      throwError('No config file found');
    }
  };
};
