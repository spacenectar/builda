import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import globals from '@data/globals';

// Import types
import { ConfigFile } from '@typedefs/config-file';

const { configFileName } = globals;

const configFile = path.join('.', configFileName);

const getConfigFile = () => {
  if (fs.existsSync(configFile)) {
    const config = yaml.load(fs.readFileSync(configFile, 'utf8'), {
      json: true
    }) as ConfigFile;
    return config;
  } else {
    return null;
  }
};

export default getConfigFile;
