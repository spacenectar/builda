import fs from 'fs';
import path from 'path';

import generateBlueprintRegistry from '@scripts/generate-blueprint-registry';

const blueprintPath = path.resolve('./src/mocks/blueprints');
const registryPath = `${blueprintPath}/test-blueprint/registry.json`;

describe('generateBlueprintRegistry', () => {
  beforeEach((done) => {
    generateBlueprintRegistry(blueprintPath);
    return done();
  });

  describe('generateBlueprintRegistry() function happy path', () => {
    test('generateBlueprintRegistry() function generates a blueprint registry', () => {
      expect(fs.existsSync(registryPath)).toBe(true);
    });
  });
});
