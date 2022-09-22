import fs from 'fs';
import path from 'path';

import globals from 'data/globals';
import { ConfigFile } from 'types/config-file';

const getConfigFile = async (
  configPath?: string
): Promise<ConfigFile | null> => {
  if (configPath) {
    const config = require(path.resolve(configPath));
    return config;
  }

  const { configFileName } = globals;

  if (fs.existsSync(configFileName)) {
    const config = require(path.resolve(configFileName));
    return config;
  }
  return null;
};

export default getConfigFile;
