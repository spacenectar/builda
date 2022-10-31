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

  const watcher = chokidar.watch(config.rootDir, {
    persistent: true,
    ignored
  });

  watcher.on('ready', () => {
    printMessage('Watching for changes...', 'primary');
    printMessage('Press Ctrl+C to stop watching', 'secondary');
  });

  watcher.on('change', (pathString) => {
    console.log(`File ${pathString} has been changed`);
    buildaBuild({ config, prod: false, onlyPath: pathString });
  });
};
