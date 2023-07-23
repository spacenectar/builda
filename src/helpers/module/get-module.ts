import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Import globals
import globals from 'data/globals';

export const getModule = (
  type: string,
  config: ConfigFile,
  command: BlueprintScriptContent
) => {
  if (config) {
    const moduleType = `${type}s`;

    const modulePath = path.resolve(
      process.cwd(),
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
