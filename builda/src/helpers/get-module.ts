import fs from 'fs';

// Import globals
import globals from '@data/globals';

// Import helpers
import { getConfigFile } from '@helpers';

// Import types
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
    console.log(path);
    const registry = JSON.parse(fs.readFileSync(`${path}/registry.json`, 'utf8'));
    const files = registry.files.filter(
      (file: string) => file !== 'registry.json'
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
