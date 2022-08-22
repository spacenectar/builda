import fs from 'fs';
import path from 'path';

// Import globals
import globals from '@data/globals';

// Import types
import ModuleType from '@typedefs/module-types';
import { ConfigFile } from '@typedefs/config-file';
import CommandConfig from '@typedefs/command-config';

const moduleTypes = ['scaffold', 'prefab'] as ModuleType[];

export const getmodule = (config: ConfigFile, command: CommandConfig) => {
  if (config) {
    const moduleList = config.modules;
    const moduleType = moduleTypes.find(
      (type) => moduleList[type] && moduleList?.[type]?.[command.use]
    );

    const modulePath = path.resolve(
      `${globals.buildaDir}/modules/${moduleType}/${command.use}`
    );
    const registry = JSON.parse(
      fs.readFileSync(`${modulePath}/registry.json`, 'utf8')
    );
    const files = registry.files.filter(
      (file: string) => file !== 'registry.json'
    );
    return {
      path: modulePath,
      registry,
      files
    };
  }
  throw new Error(`Could not find config file`);
};

export default getmodule;
