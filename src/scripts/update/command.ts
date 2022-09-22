import { getConfigFile, throwError } from 'helpers';

import update from './update';

export default () => {
  return {
    cmd: 'update <modulePath>',
    desc: 'update a module',
    aliases: ['u'],
    handler: async (argv: any) => {
      const config = await getConfigFile(argv.configPath);
      if (config) {
        return update(argv.version);
      }
      throwError('No config file found');
    }
  };
};
