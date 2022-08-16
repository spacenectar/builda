import generateCommands from '@scripts/generate-commands';
import init from '@scripts/init';
import presetAnswers from '@mocks/preset-answers';

describe('generateCommands() function happy path', () => {
  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => null);
    await init({presetAnswers, force: true});
  });
  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test('config file is parsed and commands extracted', () => {
    const commands = generateCommands();
    expect(commands).toEqual([
      {
        name: 'atom',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/atom',
        substitute: {}
      },
      {
        name: 'component',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/component',
        substitute: {}
      },
      {
        name: 'test',
        type: 'scaffold',
        use: 'default-ts',
        outputPath: './experiments/test',
        substitute: {}
      }
    ]);
  });
});
