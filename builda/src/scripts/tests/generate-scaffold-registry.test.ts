import fs from 'fs';
import path from 'path';

import generateScaffoldRegistry from '@scripts/generate-scaffold-registry';

const scaffoldPath = path.resolve('./src/mocks/scaffolds');
const registryPath = `${scaffoldPath}/test-scaffold/registry.json`;

describe('generateScaffoldRegistry', () => {
  beforeEach((done) => {
    generateScaffoldRegistry(scaffoldPath);
    return done();
  });

  describe('generateScaffoldRegistry() function happy path', () => {
    test('generateScaffoldRegistry() function generates a scaffold registry', () => {
      expect(fs.existsSync(registryPath)).toBe(true);
    });
  });
});
