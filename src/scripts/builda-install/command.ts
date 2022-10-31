import yargs from 'yargs';

import { getConfigFile, throwError } from 'helpers';
import globals from 'data/globals';

import buildaInstall from './install';

const { websiteUrl } = globals;

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'install <modulePath>',
    desc: 'Adds a new blueprint',
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async (argv: Args) => {
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
