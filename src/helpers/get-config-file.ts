import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import globals from '@data/globals';
import throwError from './throw-error';

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
    return throwError(
      `${configFileName} file not found. Please run 'builda --init' to create a new config file.`
    );
  }
};

export default getConfigFile;
