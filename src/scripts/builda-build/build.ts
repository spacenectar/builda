#! /usr/bin/env node

import fs from 'node:fs';

// Run a build
import { printMessage, throwError, checkAndCopyPath } from 'helpers';

import globals from 'data/globals';
import ignoredFiles from 'data/ignore-file.json';

import type { ConfigFile } from 'types/config-file';

const ignored = ignoredFiles.ignore;

type TBuild = {
  /**
   * The project config
   */
  config: ConfigFile;
  /**
   * If only a specific path should be built, this is the path
   */
  onlyPath?: string;
};

export default async ({ config, onlyPath }: TBuild) => {
  const { prefab } = config;
  const root = process.cwd();

  if (!prefab) {
    throwError(
      'No prefab found in config file. Build cannot be run without a prefab'
    );
  }

  if (onlyPath) {
    const cleanRoot = root.replace(/\.\//, '');
    checkAndCopyPath(
      onlyPath,
      `${globals.buildaDir}/export`,
      onlyPath.replace(cleanRoot, '')
    );
  } else {
    const promises = [] as Promise<string>[];
    printMessage('Building your project', 'processing');

    // Get a list of all of the files in the root directory
    fs.readdir(root, (err, files) => {
      if (err) {
        throwError(err.message);
      }

      files.forEach((file) => {
        if (!ignored.includes(file)) {
          checkAndCopyPath(
            `${root}/${file}`,
            `${globals.buildaDir}/export`,
            file
          );
        }
        promises.push(
          new Promise((resolve) => {
            resolve(file);
          })
        );
      });

      Promise.all(promises).then(() => {
        printMessage('Build complete', 'success');
      });
    });
  }
};
