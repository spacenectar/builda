#! /usr/bin/env node
// Loop through all files in the 'scaffolds' directory and build a page that lists all the files

import fs from 'fs';
import path from 'path';

import ignoreFiles from '@data/ignore-file.json';

export const generateScaffoldRegistry = (scaffoldPath?: string) => {
  const readPath = scaffoldPath || './scaffolds';
  return fs.readdirSync(path.resolve(readPath)).forEach((file) => {
    // Is it a directory?

    const ignore = [...ignoreFiles.ignore, 'registry.json'];

    if (ignore.includes(file)) {
      return;
    }

    const isDirectory = fs.lstatSync(`${readPath}/${file}`).isDirectory();

    if (isDirectory) {
      // Build a page for the directory
      const page = `
          {
            "name": "${file}",
            "version": "1.0.0",
            "description": "",
            "files": [
              ${fs
                .readdirSync(`${readPath}/${file}`)
                .map((file) => {
                  if (!ignore.includes(file)) {
                    return `"${file}"`;
                  } else {
                    return '';
                  }
                })
                .filter((file) => file !== '')
                .join(',')}
            ]
          }
      `;

      fs.writeFileSync(`${readPath}/${file}/registry.json`, page);
    }
  });
};

// Run automatically if this file is run directly
if (require.main === module) {
  generateScaffoldRegistry();
}

export default generateScaffoldRegistry;
