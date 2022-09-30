import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import tar from 'tar';

import globals from 'data/globals';
import ModuleRegistry from 'types/module-registry';
import getRegistry from './get-registry';
import { createDir, throwError, printMessage } from 'helpers';

export const addRemoteModule = async (
  modulePath: string,
  output?: string
): Promise<ModuleRegistry> => {
  const buildaDir = path.join(output || './', globals.buildaDir);
  // get the directory contents
  const registry = await getRegistry(modulePath);
  const outputPath =
    registry.type === 'blueprint'
      ? `${buildaDir}/modules/blueprints/${registry.name}`
      : `${buildaDir}/modules/prefab`;

  await createDir(outputPath);

  printMessage(`Downloading ${registry.name}...`, 'downloading');
  // Download the tarball
  await axios
    .get(`${modulePath}/files.tgz`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'application/gzip'
      }
    })
    .then((res) =>
      fs.writeFileSync(`${outputPath}/files.tgz`, res.data, {
        encoding: 'binary'
      })
    )
    .then(async () => {
      if (fs.existsSync(`${outputPath}/files.tgz`)) {
        printMessage('Extracting module files...', 'config');
        try {
          await tar.extract({
            file: `${outputPath}/files.tgz`,
            cwd: outputPath
          });
          fs.unlinkSync(`${outputPath}/files.tgz`);
        } catch (err) {
          throwError(err);
        }
      }
    })
    .catch((err) => {
      throwError(
        `There was an error downloading the tarball. Please check the URL and try again.\n\n${err}`
      );
    })
    .finally(() => {
      printMessage('Copying the registry file...', 'copying');
      // Write the registry to the output directory
      fs.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
    });

  printMessage('Done.', 'success');
  return registry;
};

export default addRemoteModule;
