import fs from 'node:fs';

/**
 * Packages a module and publishes it to the repository and optionally to the trade store.
 */
export const checkPathExists = (pathString: string, isDir?: boolean) => {
  // For now, just check if the README file exists
  if (!fs.existsSync(pathString)) {
    return {
      error: true,
      message: `Cannot find ${
        isDir && 'a folder called'
      } '${pathString}' in the current directory.`
    };
  }

  return {
    error: false,
    message: ''
  };
};
