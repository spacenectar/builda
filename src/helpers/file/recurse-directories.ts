import path from 'node:path';
import fs from 'node:fs';
import glob from 'glob';

import globals from 'data/globals';

import { checkIfIgnored } from 'helpers';

type FunctionParams = {
  // This is just here for debugging purposes
  log?: boolean;

  // An array of file paths to be rewritten
  paths: string[];

  // The source directory
  source: string;
};

export const recurseDirectories = async ({
  log,
  paths,
  source
}: FunctionParams): Promise<string[] | unknown[]> => {
  const { buildaDir } = globals;

  const prefabDir = path.join(buildaDir, 'modules', 'prefab');
  const propsList = {
    log,
    paths,
    source
  };

  // Get a list of files to ignore from the .gitignore file in the prefab
  const promises = [];
  for (const file of paths) {
    const filePath = path.join(source, file);
    // Check if the file is in the ignore list
    if (checkIfIgnored(buildaDir, filePath)) {
      continue;
    }

    // Check if file is glob
    if (file.includes('*')) {
      const globFiles = glob
        .sync(filePath)
        .map((f) => path.relative(prefabDir, f));
      promises.push(
        await recurseDirectories({
          ...propsList,
          paths: globFiles
        })
      );
    } else if (fs.lstatSync(filePath).isDirectory()) {
      const files = fs.readdirSync(filePath);
      const newFiles = files.map((f) => path.join(file, f));
      promises.push(
        await recurseDirectories({
          ...propsList,
          paths: newFiles
        })
      );
    } else {
      promises.push(
        new Promise((resolve) => {
          resolve(filePath);
        })
      );
    }
  }
  // Wait for all promises to resolve
  return Promise.all(promises.flat());
};

export default recurseDirectories;
