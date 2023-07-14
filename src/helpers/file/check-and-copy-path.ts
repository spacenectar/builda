import fs from 'fs';
import path from 'path';

export const copyPath = (
  sourcePath: string,
  destinationPath: string,
  fileName?: string
) => {
  const name = fileName ?? '';

  return fs.cpSync(sourcePath, path.join(destinationPath, name), {
    dereference: true,
    recursive: true,
    force: true
  });
};

export default copyPath;
