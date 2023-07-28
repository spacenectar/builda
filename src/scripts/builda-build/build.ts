#! /usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
// Run a build
import {
  printMessage,
  throwError,
  syncWithExport,
  recurseDirectories,
  generateExport
} from 'helpers';

import globals from 'data/globals';

type TBuild = {
  /**
   * The project config
   */
  config: ConfigFile;
};

export default async ({ config }: TBuild) => {
  const { prefab, ejected } = config;
  const root = process.cwd();

  if (!prefab) {
    throwError(
      'No prefab found in config file. Build cannot be run without a prefab'
    );
  }
  const buildaDir = path.join(root, globals.buildaDir);
  const prefabDir = path.join(root, globals.buildaDir, 'modules', 'prefab');

  if (!fs.existsSync(buildaDir)) {
    throwError(
      'No .builda directory found. Try running `builda install` first'
    );
  }
  if (!fs.existsSync(prefabDir)) {
    throwError('No prefab directory could be found in .builda/modules');
  }
  printMessage('Building project...', 'processing');

  // Get a list of all of the files in the root directory
  fs.readdir(root, async (err, files) => {
    if (err) {
      throwError(err.message);
    }

    // regenerate the export directory
    generateExport({ buildaDir, prefabDir });

    // Delete any files in the export folder that have been ejected
    ejected?.forEach((ejectedPath) => {
      syncWithExport({
        type: 'delete',
        pathString: ejectedPath
      });
    });

    const fileList = (await recurseDirectories({
      paths: files,
      source: root
    })) as string[];

    fileList.forEach((file) => {
      syncWithExport({
        type: 'update',
        pathString: file.replace(`${root}/`, '')
      });
    });
  });
};
