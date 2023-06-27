import buildaPackage from './package';

export default () => {
  return {
    command: 'package',
    desc: 'Package a module ready for publishing',
    aliases: ['package', 'pack'],
    handler: async () => {
      return buildaPackage();
    }
  };
};
