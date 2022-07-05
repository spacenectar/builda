import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const configFile = path.join('.', '.builda.yml');

const getConfigFile = () => {
  if (fs.existsSync(configFile)) {
    const config = yaml.load(fs.readFileSync(configFile, 'utf8')) as Object;
    return config;
  } else {
    return;
  }
};

export default getConfigFile;
