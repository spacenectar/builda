import yargs from 'yargs';

import buildaInstall from './install';

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'install',
    desc: 'Installs the applications prefab and builds the export directory',
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async () => {
      return buildaInstall();
    }
  };
};
