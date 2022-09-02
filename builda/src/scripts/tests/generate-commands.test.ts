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
        use: 'default-ts',
        output_dir: './experiments/atoms'
      },
      component: {
        use: 'default-ts',
        output_dir: './experiments/components'
      },
      test: {
        use: 'default-ts',
        output_dir: './experiments/tests'
      }
    });
  });
});
