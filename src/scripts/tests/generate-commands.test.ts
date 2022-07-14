import generateCommands from '@scripts/generate-commands';
import debug from '@scripts/debug';

describe('generateCommands() fucntion happy path', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    debug({ runInit: true, force: true });
  });
  afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });
  test('config file is parsed and commands extracted', () => {
    const config = generateCommands();
    expect(config).toEqual(['atom', 'component', 'test']);
  });
});
