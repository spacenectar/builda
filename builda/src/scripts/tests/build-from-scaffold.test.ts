import fs from 'fs';

import init from '@scripts/init';
import buildFromScaffold from '@scripts/build-from-scaffold';

import presetAnswers from '@mocks/preset-answers';

const MOCK_OUTPUT_DIRECTORY = './experiments/atom';

describe('Build from scaffold function', () => {
  beforeAll(async () => {
    jest.spyOn(console, 'log').mockImplementation(() => null);
    await init({presetAnswers, force: true});
    buildFromScaffold({
      name: 'TestComponent',
      command: 'atom'
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
    fs.rmSync('./experiments', { recursive: true });
  });

  test('An index.tsx file is generated with the correct data', () => {
    const filePath = `${MOCK_OUTPUT_DIRECTORY}/test-component/index.tsx`;
    expect(fs.existsSync(filePath)).toBe(true);
    const file = fs.readFileSync(filePath, 'utf8');
    expect(file).toContain(
      'export const TestComponent: React.FC<Props> = ({'
    );
    expect(file).toContain(
      "<div className={`'test-component' ${className}`} {...props}>"
    );
    expect(file).toContain('export default TestComponent;');
  });
});
