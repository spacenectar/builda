// Copy all rootFiles into the application root
import fs from 'node:fs';
import path from 'node:path';
import glob from 'glob';

import globals from 'data/globals';

const { buildaDir } = globals;
const prefabDir = path.join(buildaDir, 'modules', 'prefab');

export default async (paths: string[], rootDir: string) => {
  paths.forEach(async (file) => {
    const filePath = path.join(prefabDir, file);
    if (file.includes('*')) {
      const globFiles = glob
        .sync(filePath)
        .map((f) => path.relative(prefabDir, f));
      globFiles.forEach(async (globFile) => {
        // Get the file name
        const fileName = path.basename(globFile);
        // Remove the file name from the path
        const fileDir = path.dirname(globFile);
        // Create the directory tree
        fs.mkdirSync(path.join(rootDir, fileDir), { recursive: true });
        // Copy the file
        fs.copyFileSync(
          path.join(prefabDir, fileDir, fileName),
          path.join(rootDir, fileDir, fileName)
        );
      });
    }
  });
};
