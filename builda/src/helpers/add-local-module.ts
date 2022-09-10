import fs from 'fs';

import ModuleRegistry from '@typedefs/module-registry';
import createDir from './create-dir';
import getRegistry from './get-registry';
import globals from '@data/globals';
import ignoreFile from '@data/ignore-file.json';

export const addLocalModule = async (
  modulePath: string
): Promise<ModuleRegistry> => {
  // Ignore these files
  const ignoreFiles = ignoreFile.ignore;
  // get the registry data
  const registry = await getRegistry(modulePath);
  // get the directory contents
  const files = fs.readdirSync(modulePath);
  // filter out the ignore files
  const filteredFiles = files.filter(
    (file: string) => !ignoreFiles.includes(file)
  );
  // write the files to the output directory
  filteredFiles.forEach(async (file: string) => {
    const srcPath = `${modulePath}/${file}`;
    const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;
    await createDir(outputPath).then(() => {
      fs.copyFileSync(srcPath, `${outputPath}/${file}`);
    });
  });
  return registry;
};

export default addLocalModule;
