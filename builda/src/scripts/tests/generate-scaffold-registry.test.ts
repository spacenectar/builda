import fs from 'fs';

import generateScaffoldRegistry from '@scripts/generate-scaffold-registry';
import path from 'path';
import init from '@scripts/init';
import presetAnswers from '@mocks/preset-answers';

const scaffoldPath = path.resolve('./src/mocks/scaffolds');
const registryPath = `${scaffoldPath}/test-scaffold/registry.json`;

beforeAll(async () => {
  if (fs.existsSync(registryPath)) {
    fs.rmSync(registryPath);
  }
  jest.spyOn(console, 'log').mockImplementation(() => null);
  await init({presetAnswers, force: true});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('generateScaffoldRegistry() function happy path', () => {
  test('generateScaffoldRegistry() function generates a scaffold registry', () => {
    generateScaffoldRegistry(scaffoldPath);
    expect(fs.existsSync(registryPath)).toBe(true);
  });
});
