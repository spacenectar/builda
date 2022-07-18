import fs from 'fs';

import generateScaffoldRegistry from '@scripts/generate-scaffold-registry';

describe('generateScaffoldRegistry() function happy path', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    if (fs.existsSync('./src/mocks/scaffolds/test-scaffold/registry.json')) {
      fs.rmSync('./src/mocks/scaffolds/test-scaffold/registry.json');
    }
  });
  test('generateScaffoldRegistry() function generates a scaffold registry', () => {
    generateScaffoldRegistry('./src/mocks/scaffolds/test-scaffold');
    expect(
      fs.existsSync('./src/mocks/scaffolds/test-scaffold/registry.json')
    ).toBe(true);
  });
});
