import fs from 'fs';
import axios from 'axios';

import globals from '@data/globals';
import ignoreFile from '@data/ignore-file.json';
import ModuleRegistry from '@typedefs/module-registry';
import getRegistry from './get-registry';
import createDir from './create-dir';
import throwError from './throw-error';

export const addRemoteModule = async (
  modulePath: string
): Promise<ModuleRegistry> => {
  // Ignore these files
  const ignoreFiles = ignoreFile.ignore;

  // get the directory contents
  const registry = await getRegistry(modulePath);
  const files = [...registry.files, 'registry.json'];
  files
    .filter((file: string) => !ignoreFiles.includes(file))
    .forEach(async (file: string) => {
      const srcPath =
        file === 'registry.json'
          ? `${modulePath}/${file}`
          : `${modulePath}/files/${file}`;
      // Download the file
      await axios
        .get(srcPath)
        .then((response) => {
          const content =
            file === 'registry.json'
              ? JSON.stringify(response.data, null, 2)
              : response.data.toString();

          const fileObject = {
            name: file,
            content
          };
          const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;
          return createDir(outputPath).then(() => {
            return fs.writeFileSync(
              `${outputPath}/${fileObject.name}`,
              fileObject.content
            );
          });
        })
        .catch((error) => {
          throwError(error);
        });
    });
  return registry;
};

export default addRemoteModule;
