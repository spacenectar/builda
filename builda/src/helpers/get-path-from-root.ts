import path from 'path';

import { ConfigFile } from '@typedefs/config-file';

const getPathFromRoot = (config: ConfigFile, pathString: string) => {
  if (config) {
    const fullPath = path.join(config.app_root, pathString);
    return fullPath;
  } else {
    throw new Error('No config file found');
  }
};

export default getPathFromRoot;
