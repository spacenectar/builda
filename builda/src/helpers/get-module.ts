import fs from 'fs';
import path from 'path';

// Import globals
import globals from '@data/globals';

// Import types

import { ConfigFile } from '@typedefs/config-file';
import { ScaffoldScriptContent } from '@typedefs/scaffold-script-config';

export const getModule = (
  type: 'scaffold' | 'prefab',
  config: ConfigFile,
  command: ScaffoldScriptContent
) => {
  if (config) {
    const moduleType = `${type}s`;

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

export default getModule;
