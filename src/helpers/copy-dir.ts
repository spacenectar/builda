import fs from 'node:fs';
import path from 'node:path';

export const copyDir = (source: string, destination: string) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  fs.readdirSync(source).forEach((file) => {
    const srcPath = path.resolve(source, file);
    const destPath = path.resolve(destination, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
};

export default copyDir;
