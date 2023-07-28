import path from 'node:path';
import fs from 'node:fs';
import glob from 'glob';

import globals from 'data/globals';

import { createDir, writeFile, checkIfIgnored } from 'helpers';

type FunctionParams = {
  // This is just here for debugging purposes
  log?: boolean;
  // The name of the app being created (used for substitution)
  name?: string;
  // An array of file paths to be rewritten
  paths: string[];
  // Use ignore list to ignore files
  ignore?: string[];
  // An array of substitutions to be made
  substitute: TSubstitution[];
  // The source directory
  source: string;
  // The destination directory
  destination: string;
};

export const loopAndRewriteFiles = async ({
  log,
  name,
  paths,
  substitute,
  source,
  destination
}: FunctionParams) => {
  const { buildaDir } = globals;

  const prefabDir = path.join(buildaDir, 'modules', 'prefab');
  const propsList = {
    log,
    name,
    paths,
    substitute,
    source,
    destination
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
        await loopAndRewriteFiles({
          ...propsList,
          paths: globFiles
        })
      );
    } else if (fs.lstatSync(filePath).isDirectory()) {
      const files = fs.readdirSync(filePath);
      const newFiles = files.map((f) => path.join(file, f));
      promises.push(
        await loopAndRewriteFiles({
          ...propsList,
          paths: newFiles
        })
      );
    } else {
      promises.push(
        new Promise((resolve) => {
          const basePath = path.dirname(file);
          const directoryPath = path.join(destination, basePath);
          if (checkIfIgnored(buildaDir, filePath)) {
            return;
          }

          createDir(directoryPath);
          if (fs.existsSync(filePath)) {
            const subs = substitute.map((substitution) => {
              if (
                substitution.reverseInExport &&
                (directoryPath.includes('export') ||
                  directoryPath.includes('prefab'))
              ) {
                // If the substitution is set to be reversed, reverse it if possible
                return {
                  ...substitution,
                  replace: substitution.with,
                  with: substitution.replace
                };
              }
              return substitution;
            });
            // Copy the file to the output directory and rewrite it

            writeFile({
              file: filePath,
              outputDir: directoryPath,
              substitute: subs,
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
