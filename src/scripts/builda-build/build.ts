#! /usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
// Run a build
import { printMessage, throwError, copyPath, getRegistry } from 'helpers';

import globals from 'data/globals';
import ignoredFiles from 'data/ignore-file.json';

import type { ConfigFile } from 'types/config-file';

const ignored = ignoredFiles.ignore;

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
  const exportRoot = path.join(workingDir, 'export');
  const registry = await getRegistry(exportRoot);

  const uniqueAppFiles =
    registry.generatorOptions?.rootFiles?.filter((file) => {
      const pathString = typeof file === 'string' ? file : file.path;

      if (pathString.startsWith('unique.')) {
        return true;
      }

      return false;
    }) ?? [];

  const ignoredFiles = [
    ...ignored,
    ...uniqueAppFiles.map((file) =>
      typeof file === 'string' ? file : file.path
    )
  ];

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
      if (!ignoredFiles.includes(file)) {
        copyPath(`${root}/${file}`, `${globals.buildaDir}/export`, file);
      }
      promises.push(Promise.resolve(file));
    });

    Promise.all(promises).then(() => {
      printMessage('Build complete', 'success');
    });
  });
};
