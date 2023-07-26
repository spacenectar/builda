import fs from 'fs';

export const copyPath = (sourcePath: string, destinationPath: string) => {
  return fs.cpSync(sourcePath, destinationPath, {
    dereference: true,
    recursive: true,
    force: true
  });
};

export default copyPath;
