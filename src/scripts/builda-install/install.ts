import fs from 'node:fs';
import path from 'node:path';

import { ConfigFile } from 'types/config-file';

// Import globals
import globals from 'data/globals';

// Import scripts
import { buildaAdd } from 'scripts';
import { getConfig, printMessage } from 'helpers';

export type InstallModulesResponse = {
  config: ConfigFile;
};

export default async () => {
  // If the project is a prefab project, install the prefab files

  const { prefab, blueprints } = getConfig();
  const { buildaDir } = globals;
  let success = false;

  if (prefab) {
    await buildaAdd({
      modulePath: prefab.name
    });
    // Check the prefab was installed successfully
    const prefabPath = path.join(process.cwd(), buildaDir, 'modules', 'prefab');
    if (fs.existsSync(prefabPath)) {
      success = true;
    }
  }

  // If the project uses blueprints, install the blueprints that are not already
  // part of the prefab
  if (blueprints) {
    const blueprintsArray = Object.keys(blueprints).filter(
      (blueprint) => blueprints[blueprint].location !== 'prefab'
    );
    for (const blueprint of blueprintsArray) {
      await buildaAdd({
        modulePath: blueprint
      });
      // Check the blueprint was installed successfully
      const blueprintPath = path.join(
        process.cwd(),
        buildaDir,
        'modules',
        'blueprints',
        blueprint
      );
      if (fs.existsSync(blueprintPath)) {
        success = true;
      }
    }
  }

  if (success) {
    printMessage('Installation complete', 'success');
  }
};
