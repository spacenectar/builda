import generateCommands from '@scripts/generate-commands';

describe('generateCommands', () => {
  let commands = {};

  beforeEach(() => {
    commands = generateCommands();
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
