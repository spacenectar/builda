import buildFromScaffold from '@scripts/build-from-scaffold';
import fs from 'fs';

import init from '@scripts/init';
import presetAnswers from '@mocks/preset-answers';
import path from 'path';

const FILE_PATH = './experiments/atom/test-component/index.tsx';
const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';

beforeAll(async () => {
  await init({presetAnswers});
  return buildFromScaffold({
    name: 'TestComponent',
    command: 'atom'
  });
});

afterAll(() => {
  if (fs.existsSync(CONFIG_FILE)) {
    fs.rmSync(path.resolve(CONFIG_FILE));
  }
  if (fs.existsSync(CONFIG_FOLDER)) {
    fs.rmSync(path.resolve(CONFIG_FOLDER), { recursive: true });
  }
  if (fs.existsSync(FILE_PATH)) {
    fs.rmSync(path.resolve(FILE_PATH));
  }
});

test('Builds a component from a scaffold', () => {
  expect(fs.existsSync(FILE_PATH)).toBe(true);
});

test('The index.tsx file contains the correct data', () => {
  const file = fs.readFileSync(path.resolve(FILE_PATH), 'utf8');
  expect(file).toContain(
    'export const TestComponent: React.FC<Props> = ({'
  );
  expect(file).toContain(
    "<div className={`'test-component' ${className}`} {...props}>"
  );
  expect(file).toContain('export default TestComponent;');
});
