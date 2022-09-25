import path from 'path';

import { ConfigFile } from 'types/config-file';
import { throwError } from 'helpers';

const getPathFromRoot = (config: ConfigFile, pathString: string) => {
  if (config) {
    const appRoot = config.rootDir || './';
    return path.join(appRoot, pathString);
  } else {
    return throwError('No config file found');
  }
};

export default getPathFromRoot;
