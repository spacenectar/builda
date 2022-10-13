import yargs from 'yargs';

import buildaProject from './project';

export default () => {
  return {
    command: 'project [appName]',
    desc: 'Generate a new app from a prefab',
    aliases: ['app', '--app', '--project'],
    builder: (yargs: yargs.Argv): yargs.Argv<unknown> | null => {
      return yargs
        .positional('appName', {
          describe: 'The name of the app',
          type: 'string',
          default: ''
        })
        .option('pathName', {
          alias: 'p',
          default: '',
          describe: 'The path to the prefab (url or local path)',
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
        })
        .option('smokeTest', {
          alias: 's',
          default: false,
          describe: 'Runs the command but deletes the output immediately',
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
      await buildaProject({ ...args });
    }
  };
};
