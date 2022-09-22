import fs from 'fs';
import path from 'path';

// Import globals
import globals from 'data/globals';

// Import types

import { ConfigFile } from 'types/config-file';
import { BlueprintScriptContent } from 'types/blueprint-script-config';

export const getModule = (
  type: 'blueprint' | 'prefab',
  config: ConfigFile,
  command: BlueprintScriptContent
) => {
  if (config) {
    const moduleType = `${type}s`;

    const modulePath = path.resolve(
      `${globals.buildaDir}/modules/${moduleType}/${command.use}`
    );
    const registry = JSON.parse(
      fs.readFileSync(`${modulePath}/registry.json`, 'utf8')
    );
    return {
      path: modulePath,
      registry
    };
  }
  throw new Error(`Could not find config file`);
};

export default getModule;
