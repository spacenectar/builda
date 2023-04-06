import yargs from 'yargs';

import buildaPackage from './package';

type Args = {
  version: string;
};

export default () => {
  return {
    command: 'package',
    desc: 'Package a module ready for publishing',
    aliases: ['package', 'pack'],
    builder: (yargs: yargs.Argv): yargs.Argv<Args> => {
      return yargs.option('version', {
        aliases: ['v', 'ver'],
        default: '',
        describe: 'update module version (semver)',
        type: 'string'
      });
    },
    handler: async (argv: Args) => {
      return buildaPackage(argv.version);
    }
  };
};
