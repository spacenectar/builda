import path from 'node:path';
import fs from 'node:fs';
import glob from 'glob';

import globals from 'data/globals';

import createDir from './create-dir';
import TSubstitution from 'types/substitution';
import writeFile from './write-file';

type FunctionParams = {
  // The name of the app being created (used for substitution)
  name?: string;
  // An array of file paths to be rewritten
  paths: string[];
  // An array of substitutions to be made
  substitute: TSubstitution[];
};

export const loopAndRewriteFiles = async ({
  name,
  paths,
  substitute
}: FunctionParams) => {
  const { buildaDir } = globals;

  const prefabDir = path.join(buildaDir, 'modules', 'prefab');
  const workingDir = path.join(buildaDir, 'export');

  const promises = [];
  for (const file of paths) {
    const filePath = path.join(prefabDir, file);

    // Check if file is glob
    if (file.includes('*')) {
      const globFiles = glob
        .sync(filePath)
        .map((f) => path.relative(prefabDir, f));
      promises.push(
        await loopAndRewriteFiles({ name, paths: globFiles, substitute })
      );
    } else if (fs.lstatSync(filePath).isDirectory()) {
      const files = fs.readdirSync(filePath);
      const newFiles = files.map((f) => path.join(file, f));
      promises.push(
        await loopAndRewriteFiles({ name, paths: newFiles, substitute })
      );
    } else {
      promises.push(
        new Promise((resolve) => {
          const directoryPathWithoutFile = path.dirname(file);
          const directoryPath = path.join(workingDir, directoryPathWithoutFile);
          createDir(directoryPath);
          if (fs.existsSync(filePath)) {
            writeFile({
              file: filePath,
              outputDir: directoryPath,
              substitute,
              name
            });
          }
          resolve(filePath);
        })
      );
    }
  }
  // Wait for all promises to resolve
  await Promise.all(promises);
};

export default loopAndRewriteFiles;
