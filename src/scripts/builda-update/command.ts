import yargs from 'yargs';

import buildaUpdate from './update';

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'update',
    desc: 'Updates the applications prefab to the latest version',
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async () => {
      return buildaUpdate();
    }
  };
};
