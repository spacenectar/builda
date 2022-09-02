#! /usr/bin/env node

import fs from 'fs';
import glob from 'glob';
import path from 'path';

import { ConfigFile } from '@typedefs/config-file';
import { getPathFromRoot } from '@helpers';

import globals from '@data/globals';

const checkAndCopyFiles = (
  sourcePath: string,
  destinationPath: string,
  fileName: string
) => {
  // If it's a directory, copy the directory to the destination
  if (fs.lstatSync(sourcePath).isDirectory()) {
    return fs.cpSync(sourcePath, path.join(destinationPath, fileName), {
      recursive: true,
      force: true
    });
  }

  // If it's a file, copy it to the destination
  if (fs.lstatSync(sourcePath).isFile()) {
    return fs.copyFileSync(sourcePath, path.join(destinationPath, fileName));
  }
};

export const syncWatched = (config: ConfigFile) => {
  const { buildaDir } = globals;
  if (config) {
    const { watched } = config;
    if (watched) {
      watched.forEach((source) => {
        const sourcePath = getPathFromRoot(config, source);
        const destinationPath = `${buildaDir}/modules/prefab/test`;
        // Check if source is a file, directory or glob pattern

        // If it's a glob pattern, copy the files that match the pattern to the destination
        if (source.includes('*')) {
          // Get the files that match the glob pattern
          return glob(sourcePath, (err, files) => {
            if (err) {
              throw new Error(err.message);
            } else {
              files.forEach((file) => {
                const appRoot = config.app_root.replace(/.?\//, '');
                const fileName = file.replace(appRoot, '');
                checkAndCopyFiles(file, destinationPath, fileName);
              });
            }
          });
        }

        return checkAndCopyFiles(sourcePath, destinationPath, source);
      });
    }
  } else {
    throw new Error('No config file found');
  }
};

export default syncWatched;
