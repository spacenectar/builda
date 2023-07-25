import path from 'node:path';
import fs from 'node:fs';
import glob from 'glob';

import globals from 'data/globals';

import createDir from './create-dir';
import writeFile from './write-file';

type FunctionParams = {
  // The name of the app being created (used for substitution)
  name?: string;
  // An array of file paths to be rewritten
  paths: string[];
  // An array of substitutions to be made
  substitute: TSubstitution[];
  // Run from the root directory instead of the prefab directory
  fromRoot?: boolean;
  // Run from the a custom directory
  fromCustomPath?: string;
  // Copy to the root directory as well as the export directory
  toRoot?: boolean;
};

export const loopAndRewriteFiles = async ({
  name,
  paths,
  substitute,
  fromRoot = false,
  fromCustomPath,
  toRoot = false
}: FunctionParams) => {
  const { buildaDir } = globals;

  const prefabDir = path.join(buildaDir, 'modules', 'prefab');
  const workingDir = path.join(buildaDir, 'export');

  const promises = [];
  for (const file of paths) {
    const filePath = fromRoot ? file : path.join(prefabDir, file);

    // Check if file is glob
    if (file.includes('*')) {
      const globFiles = glob
        .sync(filePath)
        .map((f) => path.relative(prefabDir, f));
      promises.push(
        await loopAndRewriteFiles({
          name,
          paths: globFiles,
          substitute,
          fromRoot,
          fromCustomPath,
          toRoot
        })
      );
    } else if (fs.lstatSync(filePath).isDirectory()) {
      const files = fs.readdirSync(filePath);
      const newFiles = files.map((f) => path.join(file, f));
      promises.push(
        await loopAndRewriteFiles({
          name,
          paths: newFiles,
          substitute,
          fromRoot,
          fromCustomPath,
          toRoot
        })
      );
    } else {
      promises.push(
        new Promise((resolve) => {
          const basePath = path.dirname(file);
          const fileName = path.basename(file);
          const directoryPath = path.join(workingDir, basePath);
          const rootDir = fromCustomPath
            ? fromCustomPath
            : path.join(process.cwd(), '..', '..');
          const rootPath = path.join(rootDir, basePath);
          createDir(directoryPath);
          if (fs.existsSync(filePath)) {
            const subs = substitute.map((substitution) => {
              // If the substitution is set to be reversed, reverse it if possible
              if (substitution.reverseInExport) {
                return {
                  ...substitution,
                  replace: substitution.with,
                  with: substitution.replace
                };
              }
              return substitution;
            });
            // Copy the file to the export directory and rewrite it
            writeFile({
              file: filePath,
              outputDir: directoryPath,
              substitute: subs,
              name
            });
            if (toRoot) {
              // Copy the file to the root directory and rewrite it
              writeFile({
                file: filePath,
                rename: fileName.replace('unique.', ''),
                outputDir: rootPath,
                substitute,
                name
              });
            }
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
