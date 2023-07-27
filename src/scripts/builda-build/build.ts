#! /usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
// Run a build
import { printMessage, throwError, copyPath, checkIfIgnored } from 'helpers';

import globals from 'data/globals';

type TBuild = {
  /**
   * The project config
   */
  config: ConfigFile;
};

export default async ({ config }: TBuild) => {
  const { prefab } = config;
  const root = process.cwd();
  const workingDir = path.join(root, globals.buildaDir);

  const prefabDir = path.join(workingDir, 'modules', 'prefab');

  if (!prefab) {
    throwError(
      'No prefab found in config file. Build cannot be run without a prefab'
    );
  }

  const promises = [] as Promise<string>[];
  printMessage('Building your project', 'processing');

  // Get a list of all of the files in the root directory
  fs.readdir(root, (err, files) => {
    if (err) {
      throwError(err.message);
    }

    files.forEach((file) => {
      if (!checkIfIgnored(prefabDir, file)) {
        copyPath(
          `${root}/${file}`,
          path.join(`${globals.buildaDir}/export`, file)
        );
      }
      promises.push(Promise.resolve(file));
    });

    Promise.all(promises).then(() => {
      printMessage('Build complete', 'success');
    });
  });
};
