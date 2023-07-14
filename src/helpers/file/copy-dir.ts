import fs from 'node:fs';
import path from 'node:path';

export const copyDir = (source: string, destination: string) => {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  fs.readdirSync(source).forEach((file) => {
    const srcPath = path.resolve(source, file);
    const destPath = path.join(destination, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.cpSync(srcPath, destPath, {
        recursive: true,
        dereference: true
      });
    }
  });
};

export default copyDir;
