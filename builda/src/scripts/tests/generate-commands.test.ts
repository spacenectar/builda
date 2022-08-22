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
        outputPath: './experiments/atom',
        substitute: []
      },
      {
        name: 'component',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/component',
        substitute: []
      },
      {
        name: 'test',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/test',
        substitute: []
      }
    ]);
  });
});
