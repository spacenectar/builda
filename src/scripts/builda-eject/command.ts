import yargs from 'yargs';
import buildaEject from './eject';

import { getConfigFile, throwError } from 'helpers';

type Args = {
  configPath: string;
  pathString: string;
};

export default () => {
  return {
    command: 'eject <pathString>',
    desc: 'Eject a file or directory from builda to make it editable',
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs
        .positional('pathString', {
          describe: 'The path to the file or directory to eject',
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
    handler: async (argv: Args) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return buildaEject({ config, pathString: argv.pathString });
      }
      throwError('No config file found');
    }
  };
};
