import getConfigFile from '@helpers/get-config-file';
import buildFromScaffold from '@scripts/build-from-scaffold';
import fs from 'fs';

import path from 'path';

const FILE_FOLDER = './experiments';
const FILE_PATH = `${FILE_FOLDER}/atoms/test-component/index.tsx`;
const CONFIG_FILE = '.builda.js';
const CONFIG_FOLDER = '.builda';

const command = {
  use: 'default-ts',
  output_dir: './experiments/atoms',
  substitute: []
};

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
  beforeAll(async () => {
    const config = await getConfigFile();
    buildFromScaffold({
      config,
      name: 'TestComponent',
      command
    });
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
