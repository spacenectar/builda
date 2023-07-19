import { getConfig } from 'helpers';
import yargs from 'yargs';

import buildaInit from './init';

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'init',
    desc: 'Initialise builda',
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async (argv: Args) => {
      const config = await getConfig(true);
      return buildaInit({ config: config || undefined });
    }
  };
};
