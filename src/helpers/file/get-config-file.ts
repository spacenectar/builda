import fs from 'fs';
import path from 'path';

import globals from 'data/globals';
import { ConfigFile } from 'types/config-file';

const getConfigFile = async (
  configPath?: string
): Promise<ConfigFile | null> => {
  if (configPath) {
    const config = JSON.parse(
      fs.readFileSync(path.resolve(configPath), 'utf8')
    );
    return config;
  }

  const { configFileName } = globals;

  if (fs.existsSync(configFileName)) {
    const config = JSON.parse(
      fs.readFileSync(path.resolve(configFileName), 'utf8')
    );
    return config;
  }
  return null;
};

export default getConfigFile;
