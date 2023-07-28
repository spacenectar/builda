#! /usr/bin/env node

// Watch for changes in the specified directories and run the 'build' script when changes are detected

import chokidar from 'chokidar';
import { printMessage, throwError, syncWithExport } from 'helpers';
import globals from 'data/globals';

export default (config: ConfigFile) => {
  const { prefab } = config;
  const ignored = [...(config.ignored ?? [])];

  if (!ignored.includes(globals.buildaDir)) {
    // Ignore the .builda directory if it's not already ignored
    ignored.push(globals.buildaDir);
  }

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
