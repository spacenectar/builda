import fs from 'fs';
import { throwError } from 'helpers/console';
import path from 'path';

const getConfig = (allowFailure?: boolean): ConfigFile => {
  if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
    const configFile = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
    );
    const config = configFile.builda;
    if (!config && !allowFailure) {
      throwError('No "builda" entry found in package.json');
    } else if (!config && allowFailure) {
      return {};
    }
    return config;
  }
  return throwError('No package.json found in project');
};

export default getConfig;
