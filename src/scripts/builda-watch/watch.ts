#! /usr/bin/env node

// Watch for changes in the specified directories and run the 'build' script when changes are detected

import chokidar from 'chokidar';
import { printMessage, throwError } from 'helpers';

import { syncWithExport } from 'helpers';

import ignoredFiles from 'data/ignore-file.json';

export default (config: ConfigFile) => {
  const { prefab } = config;
  const ignored = [...ignoredFiles.ignore, ...(config.ignored || [])];

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
      syncWithExport({
        type: 'update',
        pathString
      });
    })
    .on('add', (pathString) => {
      console.log(`File ${pathString} has been added`);
      syncWithExport({
        type: 'copy',
        pathString
      });
    })
    .on('addDir', (pathString) => {
      console.log(`Directory ${pathString} has been added`);
      syncWithExport({
        type: 'copy',
        pathString
      });
    })
    .on('unlinkDir', (pathString) => {
      console.log(`Directory ${pathString} has been deleted`);
      syncWithExport({
        type: 'delete',
        pathString
      });
    })
    .on('unlink', (pathString) => {
      console.log(`File ${pathString} has been deleted`);
      syncWithExport({
        type: 'delete',
        pathString
      });
    })
    .on('ready', () => {
      printMessage('Watching for changes...', 'primary');
      printMessage('Press Ctrl+C to stop watching', 'secondary');
    });
};
