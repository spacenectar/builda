import generateCommands from '@scripts/generate-commands';
import CommandConfig from '@typedefs/command-config';

describe('generateCommands', () => {
  let commands = [] as CommandConfig[];

  beforeEach(async () => {
    commands = await generateCommands();
  });

  test('config file is parsed and commands extracted', () => {
    expect(commands).toEqual([
      {
        name: 'atom',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/atoms'
      },
      {
        name: 'component',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/components'
      },
      {
        name: 'test',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/tests'
      }
    ]);
  });
});
