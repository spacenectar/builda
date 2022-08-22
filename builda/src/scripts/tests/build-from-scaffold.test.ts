import buildFromScaffold from '@scripts/build-from-scaffold';
import CommandConfig from '@typedefs/command-config';
import fs from 'fs';

import path from 'path';

const FILE_FOLDER = './experiments';
const FILE_PATH = `${FILE_FOLDER}/atom/test-component/index.tsx`;
const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';

const command = {
  name: 'atom',
  type: 'scaffold',
  use: 'default-ts',
  outputPath: './experiments/atom',
  substitute: []
} as CommandConfig;

afterAll((done) => {
  if (fs.existsSync(CONFIG_FILE)) {
    fs.rmSync(path.resolve(CONFIG_FILE));
  }
  if (fs.existsSync(CONFIG_FOLDER)) {
    fs.rmSync(path.resolve(CONFIG_FOLDER), { recursive: true, force: true });
  }
  if (fs.existsSync(FILE_FOLDER)) {
    fs.rmSync(path.resolve(FILE_FOLDER), { recursive: true, force: true });
  }
  done();
});

describe('buildFromScaffold', () => {
  beforeAll((done) => {
    buildFromScaffold({
      name: 'TestComponent',
      command
    });
    return done();
  });

  test('Builds a component from a scaffold', () => {
    expect(fs.existsSync(FILE_PATH)).toBe(true);
  });

  test('The index.tsx file contains the correct data', () => {
    const file = fs.readFileSync(path.resolve(FILE_PATH), 'utf8');
    expect(file).toContain('export const TestComponent: React.FC<Props> = ({');
    expect(file).toContain(
      "<div className={`'test-component' ${className}`} {...props}>"
    );
    expect(file).toContain('export default TestComponent;');
  });
});
