import yargs from 'yargs';

import buildaProject from './project';

type Args = {
  appName: string;
  prefab: string;
  smokeTest: boolean;
};

export default () => {
  return {
    command: 'project [appName]',
    desc: 'Generate a new app from a prefab',
    aliases: ['app', '--app', '--project'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs
        .positional('appName', {
          describe: 'The name of the app',
          type: 'string',
          default: ''
        })
        .option('prefab', {
          alias: 'p',
          default: '',
          describe: 'The prefab to use (url, local path, or preset name)',
          type: 'string'
        })
        .option('smokeTest', {
          alias: 's',
          default: false,
          describe: 'Runs the command but deletes the output immediately',
          type: 'boolean'
        });
    },
    handler: async (argv: Args) => {
      const args = {
        appName: argv.appName,
        prefab: argv.prefab,
        smokeTest: argv.smokeTest
      };
      await buildaProject({ ...args });
    }
  };
};
