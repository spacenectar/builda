#! /usr/bin/env node

// Watch for changes in the specified directories and run the 'build' script when changes are detected

import chokidar from 'chokidar';
import { printMessage, throwError } from 'helpers';

import { buildaBuild } from 'scripts/builda-build';

import ignoredFiles from 'data/ignore-file.json';

import type { ConfigFile } from 'types/config-file';

const ignored = ignoredFiles.ignore;

export default (config: ConfigFile) => {
  const { prefab } = config;

  if (!prefab) {
    throwError(
      'No prefab found in config file. Watch cannot be run without a prefab'
    );
  }

  const watcher = chokidar.watch('.', {
    persistent: true,
    ignoreInitial: true,
    ignored
  });

  watcher
    .on('change', (pathString) => {
      console.log(`File ${pathString} has been changed`);
      buildaBuild({ config, onlyPath: pathString });
    })
    .on('add', (pathString) => {
      console.log(`File ${pathString} has been added`);
      buildaBuild({ config, onlyPath: pathString });
    })
    .on('addDir', (pathString) => {
      console.log(`Directory ${pathString} has been added`);
      buildaBuild({ config, onlyPath: pathString });
    })
    .on('unlinkDir', (pathString) => {
      console.log(`Directory ${pathString} has been deleted`);
      buildaBuild({ config, onlyPath: pathString });
    })
    .on('unlink', (pathString) => {
      console.log(`File ${pathString} has been deleted`);
      buildaBuild({ config, onlyPath: pathString });
    })
    .on('ready', () => {
      printMessage('Watching for changes...', 'primary');
      printMessage('Press Ctrl+C to stop watching', 'secondary');
    });
};
