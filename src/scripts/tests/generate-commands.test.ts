import getConfigFile from '@helpers/get-config-file';
import generateCommands from '@scripts/generate-commands';

describe('generateCommands', () => {
  let commands = {};

  beforeEach(async () => {
    const config = await getConfigFile();
    commands = generateCommands(config);
  });

  test('config file is parsed and commands extracted', () => {
    expect(commands).toEqual({
      atom: {
        use: 'blueprint-default-ts',
        output_dir: '{{app_root}}/atoms'
      },
      component: {
        use: 'blueprint-default-ts',
        output_dir: '{{app_root}}/components'
      },
      test: {
        use: 'blueprint-default-ts',
        output_dir: '{{app_root}}/tests'
      }
    });
  });
});
