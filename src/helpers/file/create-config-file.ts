import fs from 'node:fs';
import path from 'node:path';
import { ConfigFile } from 'types/config-file';

import globals from 'data/globals';
import { throwError } from 'helpers/console';

export default async (config: Partial<ConfigFile>) => {
  const { configFileName } = globals;

  if (!fs.existsSync(path.resolve(process.cwd(), configFileName))) {
    // Write the config file
    fs.writeFileSync(
      path.resolve(process.cwd(), configFileName),
      JSON.stringify(config, null, 2)
    );
  } else {
    throwError('Config file already exists');
  }
};
