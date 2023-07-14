import fs from 'fs';
import { throwError } from 'helpers/console';
import path from 'path';

import { ConfigFile } from 'types/config-file';

/**
 * Replaces the existing 'builda' entry in the package.json file with an updated version
 * Pass null to remove the entry
 */
export const updateConfig = (update: ConfigFile | null) => {
  if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
    const configFile = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
    );
    const config = configFile;

    const newConfig = {
      ...config,
      builda: update === null ? undefined : { ...update }
    };

    fs.writeFileSync(
      path.resolve(process.cwd(), 'package.json'),
      JSON.stringify(newConfig, null, 2)
    );
  } else {
    throwError('No package.json found in project');
  }
};

export default updateConfig;
