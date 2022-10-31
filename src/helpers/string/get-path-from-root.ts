import path from 'node:path';
import process from 'node:process';

import { ConfigFile } from 'types/config-file';
import { throwError } from 'helpers';

const getPathFromRoot = (config: ConfigFile, pathString: string) => {
  if (config) {
    const appRoot = config.rootDir || process.cwd();
    return path.join(appRoot, pathString);
  } else {
    return throwError('No config file found');
  }
};

export default getPathFromRoot;
