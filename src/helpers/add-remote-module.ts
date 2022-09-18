import fs from 'fs';
import axios from 'axios';
import tar from 'tar';

import globals from '@data/globals';
import ModuleRegistry from '@typedefs/module-registry';
import getRegistry from './get-registry';
import createDir from './create-dir';
import throwError from './throw-error';
import printMessage from './print-message';

export const addRemoteModule = async (
  modulePath: string
): Promise<ModuleRegistry> => {
  // get the directory contents
  const registry = await getRegistry(modulePath);
  const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;

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
