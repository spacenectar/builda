#! /usr/bin/env node
import path from 'node:path';
import fs from 'node:fs';

import { throwError, checkAndCopyPath } from 'helpers';
import type { ConfigFile } from 'types/config-file';
import globals from 'data/globals';

export const buildFromPrefabs = (config: ConfigFile) => {
  if (config) {
    const { prefab } = config;
    const { buildaDir } = globals;
    const destinationDir = path.join(buildaDir, 'build');

    if (!prefab) {
      throwError(
        'No prefab found in config file. Build cannot be run without prefab'
      );
    }

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    // build each prefab
    const sourceDir = path.join(buildaDir, 'modules', 'prefab');
    fs.readdir(sourceDir, (err, files) => {
      if (err) {
        throwError(err.message);
      } else {
        files.forEach((file) => {
          checkAndCopyPath(path.join(sourceDir, file), destinationDir, file);
        });
      }
    });
  } else {
    throwError('No config file found');
  }
};

export default buildFromPrefabs;
