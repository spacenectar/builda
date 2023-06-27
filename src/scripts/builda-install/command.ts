import yargs from 'yargs';

import buildaInstall from './install';

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
    handler: async () => {
      return buildaInstall();
    }
  };
};
