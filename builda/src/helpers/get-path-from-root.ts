import path from 'path';

import { ConfigFile } from '@typedefs/config-file';
import throwError from './throw-error';

const getPathFromRoot = (config: ConfigFile, pathString: string) => {
  if (config) {
    const appRoot = config.app_root || './';
    return path.join(appRoot, pathString);
  } else {
    return throwError('No config file found');
  }
};

export default getPathFromRoot;
