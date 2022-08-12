import fs from 'fs';
import yaml from 'js-yaml';

// Import globals
import globals from '@data/globals';

// Import helpers
import { getConfigFile } from '@helpers';

// Import types
import ModuleRegistry from '@typedefs/module-registry';
import ModuleType from '@typedefs/module-types';

const config = getConfigFile();

const moduleTypes = ['scaffold', 'prefab'] as ModuleType[];

export const getmodule = (name: string) => {
  if (config) {
    const moduleList = config.modules;
    const moduleCategory = moduleTypes.find(
      (category) => moduleList[category] && moduleList?.[category]?.[name]
    );

    const path = `${globals.buildaDir}/modules/${moduleCategory}/${name}`;
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
  }
  throw new Error(`Could not find config file`);
};

export default getmodule;
