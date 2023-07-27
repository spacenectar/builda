import fs from 'fs';
import { throwError } from 'helpers/console';
import path from 'path';

/**
 * Get the initial list of files to ignore from the .buildaignore file
 * This function will also check for @extends lines and add the contents
 * of the extended file to the ignore list.
 * @param ignoreFilePath {string} - The path to the .buildaignore file
 * @param prefabDir {string} - The path to the prefab directory
 * @returns {string[]} ignoreList - A list of files to ignore
 */
const getInitialList = (
  ignoreFilePath: string,
  prefabDir: string
): string[] => {
  const ignoreList = [] as string[];

  const ignoreFile = fs.readFileSync(ignoreFilePath, 'utf8');

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
              const directoryPath = extendsFile.replace(fileName as string, '');
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
    } else if (line !== '' && line.startsWith('!')) {
      // If the line starts with !, we need to bypass it
      continue;
    } else if (line !== '' && !line.startsWith('#')) {
      ignoreList.push(line);
    }
  }
  // Remove duplicates from ignoreList and return
  return [...new Set(ignoreList)];
};

/**
 * This function will loop through the ignore list and expand any glob patterns
 * or directories into a list of files, giving us a complete list of files to ignore
 * @param prefabDir {string} - The path to the prefab directory
 * @param ignoreList {string[]} - The initial list of files to ignore
 * @returns {string[]} extendedIgnoreList - The extended list of files to ignore
 */
const extendIgnoreList = (
  prefabDir: string,
  ignoreList: string[]
): string[] => {
  const extendedIgnoreList = [] as string[];
  for (const ignoreItem of ignoreList) {
    const ignoreItemPath = path.join(prefabDir, ignoreItem);
    if (ignoreItem.includes('*')) {
      // TODO: Handle glob patterns
      continue;
    } else if (ignoreItem.includes('/')) {
      // If the ignore item is a directory, return the full path to the directory
      extendedIgnoreList.push(ignoreItemPath);
    } else {
      // The ignore item is to be ignored universally, so we will just push it
      // to the ignore list with a preceding `**/`
      extendedIgnoreList.push(`**/${ignoreItem}`);
    }
  }
  return extendedIgnoreList;
};

/**
 * This function will get the list of files to ignore from the .buildaignore file
 * and return the extended list of files to ignore
 * NOTE: An 'ignored' file is a file that will not be copied from the export directory
 * to the root directory.
 * @param workingDir {string} - The path to the working directory
 * @param fromModule {boolean} - Whether or not the function is being called from the module repo
 * @returns {string[]} ignoreList - The list of files to ignore
 */
export const getIgnoreList = (
  workingDir: string,
  fromModule?: boolean
): string[] => {
  const prefabDir = fromModule
    ? 'module'
    : path.join(workingDir, 'modules', 'prefab');
  const ignoreFile = path.resolve(prefabDir, '.buildaignore');
  if (fs.existsSync(ignoreFile)) {
    const initialList = getInitialList(ignoreFile, prefabDir);
    return extendIgnoreList(prefabDir, initialList);
  }
  return [];
};

export default getIgnoreList;
