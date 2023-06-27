import { getConfig, throwError } from 'helpers';
import yargs from 'yargs';

import buildaWatch from './watch';

type Args = {
  configPath: string;
};

export default () => {
  return {
    command: 'watch',
    desc: 'Watches your app for changes and rebuilds',
    aliases: ['w'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('configPath', {
        aliases: ['c', 'config'],
        default: '',
        describe: 'The path to a config file',
        type: 'string'
      });
    },
    handler: async () => {
      const config = await getConfig();
      if (config) {
        return buildaWatch(config);
      }
      throwError('No config file found');
    }
  };
};
