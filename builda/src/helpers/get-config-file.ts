import fs from 'fs';
import path from 'path';

import globals from '@data/globals';

const { configFileName } = globals;

const configFile = path.resolve(configFileName);

const getConfigFile = () => {
  if (fs.existsSync(configFile)) {
    const config = fs.readFileSync(configFile, 'utf8');
    return JSON.parse(config);
  } else {
    return null;
  }
};

export default getConfigFile;
