import fs from 'fs';
import path from 'path';

export const checkAndCopyPath = (
  sourcePath: string,
  destinationPath: string,
  fileName?: string
) => {
  const name = fileName || '';
  // If it's a directory, copy the directory to the destination
  if (fs.lstatSync(sourcePath).isDirectory()) {
    return fs.cpSync(sourcePath, path.join(destinationPath, name), {
      dereference: true,
      recursive: true,
      force: true
    });
  }

  // If it's a file, copy it to the destination
  if (fs.lstatSync(sourcePath).isFile()) {
    return fs.copyFileSync(sourcePath, path.join(destinationPath, name));
  }
};

export default checkAndCopyPath;
