// Copy all rootFiles into the application root
import fs from 'node:fs';
import path from 'node:path';

import globals from 'data/globals';

const { buildaDir } = globals;
const prefabDir = path.join(buildaDir, 'modules', 'prefab');

export default async (
  paths: string[],
  rootDir: string,
  deleteOriginal?: boolean
) => {
  paths.forEach(async (file) => {
    const filePath = path.join(prefabDir, file);
    fs.cpSync(filePath, path.join(rootDir, file), { recursive: true });
    if (deleteOriginal) {
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  });
};
