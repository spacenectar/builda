import buildaNew from '../new';
import fs from 'fs';

import path from 'path';
import config from 'mocks/builda.json';
import registry from 'mocks/.builda/modules/blueprints/component/registry.json';

const FILE_FOLDER = './experiments';
const FILE_PATH = `${FILE_FOLDER}/components/atoms/test-component/index.tsx`;

jest.mock('helpers/get-module', () => {
  return jest.fn().mockImplementation(() => {
    return {
      path: 'src/mocks/.builda/modules/blueprints/component',
      registry
    };
  });
});

describe('buildFromBlueprint', () => {
  beforeAll(async () => {
    buildaNew({
      config,
      name: 'TestComponent',
      scriptName: 'atom'
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
    if (fs.existsSync(FILE_FOLDER)) {
      fs.rmSync(FILE_FOLDER, { recursive: true });
    }
  });

  test('Builds a component from a blueprint', () => {
    expect(fs.existsSync(FILE_PATH)).toBe(true);
  });

  test('The index.tsx file contains the correct data', () => {
    const file = fs.readFileSync(path.resolve(FILE_PATH), 'utf8');
    expect(file).toContain('export const TestComponent: React.FC<Props> = ({');
    expect(file).toContain(
      ' <div className={`${styles["test-component"]} ${className}`} {...props}>'
    );
    expect(file).toContain('export default TestComponent;');
  });
});
