#! /usr/bin/env node
// Loop through all files in the 'blueprints' directory and build a page that lists all the files

import fs from 'node:fs';
import path from 'node:path';

import ignoreFiles from '@data/ignore-file.json';

export const generateBlueprintRegistry = (blueprintPath?: string) => {
  const readPath = blueprintPath || './blueprints';
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
            "type": "blueprint",
            "version": "1.0.0",
            "author": {
              "name": "",
              "builda_user:": "",
              "email": "",
              "website": ""
            },
            "url": "",
            "files": [
              ${fs
                .readdirSync(`${readPath}/${file}`)
                .map((f) => {
                  if (!ignore.includes(f)) {
                    return `"${f}"`;
                  } else {
                    return '';
                  }
                })
                .filter((f) => f !== '')
                .join(',')}
            ]
          }
      `;

      fs.writeFileSync(
        `${readPath}/${file}/registry.json`,
        JSON.stringify(page, null, 2)
      );
    }
  });
};

// Run automatically if this file is run directly
if (require.main === module) {
  generateBlueprintRegistry();
}

export default generateBlueprintRegistry;
