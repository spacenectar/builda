import yargs from 'yargs';
import project from './project';

export default () => {
  return {
    cmd: 'project [appName]',
    desc: 'Generate a new app from a prefab',
    aliases: ['app'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> => {
      return yargs
        .positional('appName', {
          describe: 'The name of the app',
          type: 'string'
        })
        .option('pathName', {
          alias: 'p',
          default: '',
          describe: 'The path to the app',
          type: 'string'
        })
        .option('packageManager', {
          alias: 'm',
          choices: ['npm', 'yarn'],
          default: 'npm',
          describe: 'The package manager to use',
          type: 'string'
        })
        .option('autoInstall', {
          alias: 'i',
          default: false,
          describe: 'Whether to automatically install dependencies',
          type: 'boolean'
        });
    },
    handler: async (argv: any) => {
      const args = {
        appName: argv.appName || argv.name,
        pathName: argv.path,
        packageManager: argv.packageManager,
        autoInstall: argv.autoInstall
      };
      await project({ ...args });
    }
  };
};
