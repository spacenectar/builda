import fs from 'fs';

import generateScaffoldRegistry from '@scripts/generate-scaffold-registry';
import path from 'path';

const scaffoldPath = path.resolve('./src/mocks/scaffolds');
const registryPath = `${scaffoldPath}/test-scaffold/registry.json`;

beforeAll(() => {
  if (fs.existsSync(registryPath)) {
    fs.rmSync(registryPath);
  }
});

describe('generateScaffoldRegistry() function happy path', () => {
  test('generateScaffoldRegistry() function generates a scaffold registry', () => {
    generateScaffoldRegistry(scaffoldPath);
    expect(fs.existsSync(registryPath)).toBe(true);
  });
});
