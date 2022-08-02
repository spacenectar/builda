import fs from 'fs';
import yaml from 'js-yaml';

// Import globals
import globals from '@data/globals';

// Import types
import ModuleRegistry from '@typedefs/module-registry';

export const getmodule = (type: 'scaffold' | 'prefab', name: string) => {
  const path = `${globals.buildaDir}/modules/${type}/${name}`;
  const registryFile = fs.readFileSync(`${path}/registry.yaml`, 'utf8');
  const registry = yaml.load(registryFile, { json: true }) as ModuleRegistry;
  const files = registry.files.filter(
    (file: string) => file !== 'registry.yaml'
  );
  return {
    path,
    registry,
    files
  };
};

export default getmodule;
