import fs from 'fs';
import path from 'path';

import globals from '@data/globals';

const { configFileName, buildaDir } = globals;

const configFile = path.resolve(buildaDir, configFileName);

const getConfigFile = async () => {
  if (fs.existsSync(configFile)) {
    const config = await import(configFile);
    return config;
  }
  return null;
};

export default getConfigFile;
