#! /usr/bin/env node

import { throwError, checkAndCopyPath } from '@helpers';
import type { ConfigFile } from '@typedefs/config-file';
import globals from '@data/globals';
import path from 'path';
import fs from 'fs';

export const buildFromPrefabs = (config: ConfigFile) => {
  if (config) {
    const { prefabs } = config;
    const { buildaDir } = globals;
    const destinationDir = path.join(buildaDir, 'build');

    if (!prefabs) {
      throwError(
        'No prefabs found in config file. Build cannot be run without prefabs'
      );
    }

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    // convert the prefabs object to an array
    const prefabArray = Object.keys(prefabs).map((key) => {
      return {
        name: key,
        ...prefabs[key]
      };
    });

    // build each prefab
    prefabArray.forEach((prefab) => {
      const sourceDir = path.join(buildaDir, 'modules', 'prefabs', prefab.name);
      fs.readdir(sourceDir, (err, files) => {
        if (err) {
          throwError(err.message);
        } else {
          files.forEach((file) => {
            checkAndCopyPath(path.join(sourceDir, file), destinationDir, file);
          });
        }
      });
    });
  } else {
    throwError('No config file found');
  }
};

export default buildFromPrefabs;
