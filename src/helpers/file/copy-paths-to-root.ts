// Copy all rootFiles into the application root
import fs from 'node:fs';
import path from 'node:path';

import globals from 'data/globals';

const { buildaDir } = globals;

export default async (
  paths: string[],
  rootDir: string,
  deleteOriginal?: boolean
) => {
  const prefabDir = path.join(rootDir, buildaDir, 'modules', 'prefab');
  paths.forEach(async (file) => {
    const filePath = path.join(prefabDir, file);
    fs.cpSync(filePath, path.join(rootDir, file), { recursive: true });
    if (deleteOriginal) {
      fs.rmSync(filePath, { recursive: true, force: true });
    }
  });
};
