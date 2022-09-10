import fs from 'fs';
import axios from 'axios';
import tar from 'tar';

import globals from '@data/globals';
import ModuleRegistry from '@typedefs/module-registry';
import getRegistry from './get-registry';
import createDir from './create-dir';
import throwError from './throw-error';

export const addRemoteModule = async (
  modulePath: string
): Promise<ModuleRegistry> => {
  // get the directory contents
  const registry = await getRegistry(modulePath);
  const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;

  await createDir(outputPath);

  // Download the tarball
  await axios
    .get(`${modulePath}/files.tgz`, {
      responseType: 'stream'
    })
    .then((res) =>
      res.data.pipe(fs.createWriteStream(`${outputPath}/files.tgz`))
    )
    .then(() => {
      tar
        .extract({
          file: `${outputPath}/files.tgz`,
          cwd: outputPath
        })
        .then(() => {
          // Remove the tarball
          fs.unlinkSync(`${outputPath}/files.tgz`);
        })
        .catch((err) => {
          throwError(err);
        });
    })
    .catch((err) => {
      throwError(
        `There was an error downloading the tarball. Please check the URL and try again.\n\n${err}`
      );
    })
    .finally(() => {
      // Write the registry to the output directory
      fs.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
    });

  return registry;
};

export default addRemoteModule;
