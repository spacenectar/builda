import fs from 'fs';
import { throwError } from 'helpers/console';
import path from 'path';
import globals from 'data/globals';

const getIgnoreList = (): string[] => {
  const { buildaDir } = globals;
  const prefabDir = path.join(process.cwd(), buildaDir, 'modules', 'prefab');
  if (fs.existsSync(path.resolve(prefabDir, '.buildaignore'))) {
    const ignoreList = [] as string[];

    const ignoreFile = fs.readFileSync(
      path.resolve(prefabDir, '.buildaignore'),
      'utf8'
    );

    const lines = ignoreFile.split('\n');

    for (const line of lines) {
      if (line !== '' && line.startsWith('@extends')) {
        const extendsFile = line.split(' ')[1];
        if (fs.existsSync(path.resolve(prefabDir, extendsFile as string))) {
          const extendsIgnoreFile = fs.readFileSync(
            path.resolve(prefabDir, extendsFile as string),
            'utf8'
          );
          const extendsLines = extendsIgnoreFile.split('\n');
          for (const extendsLine of extendsLines) {
            if (extendsLine !== '' && !extendsLine.startsWith('#')) {
              // Check if the extended file is nested in a directory
              if (extendsFile?.includes('/')) {
                const fileName = extendsFile.split('/').pop();
                const directoryPath = extendsFile.replace(
                  fileName as string,
                  ''
                );
                // prepend the directory path of the extended file to each
                // line in the extended file
                ignoreList.push(path.join(directoryPath, extendsLine));
              } else {
                // If the extended file is not nested in a directory, just
                // push the line to the ignoreList
                ignoreList.push(extendsLine);
              }
            }
          }
        } else {
          throwError(
            `File ${extendsFile} does not exist. Please check your .buildaignore file.`
          );
        }
      } else if (line !== '' && line.startsWith('@')) {
        throwError(
          `Invalid line in .buildaignore file: ${line}. Only @extends is allowed to start with @.`
        );
      } else if (line !== '' && !line.startsWith('#')) {
        ignoreList.push(line);
      }
    }

    // Remove duplicates from ignoreList and return
    return [...new Set(ignoreList)];
  }
  // No ignore file found, return empty array
  return [];
};

export default getIgnoreList;
