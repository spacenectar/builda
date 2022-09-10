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
  // Download the tarball
  const response = await axios.get(`${modulePath}/files.tar`, {
    responseType: 'stream'
  });
  // Write the tarball to the output directory
  await createDir(outputPath)
    .then(() => {
      response.data.pipe(fs.createWriteStream(`${outputPath}/files.tar`));
    })
    .catch(() => {
      throwError(`Could not download ${modulePath}`);
    });
  // Extract the tarball
  await tar.extract({
    file: `${outputPath}/files.tar`,
    cwd: outputPath
  });
  // Remove the tarball
  fs.unlinkSync(`${outputPath}/files.tar`);

  // Write the registry to the output directory
  fs.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));

  return registry;
};

export default addRemoteModule;
