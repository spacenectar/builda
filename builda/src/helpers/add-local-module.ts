import fs from 'fs';
import tar from 'tar';

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
  // Set the output path
  const outputPath = `${globals.buildaDir}/modules/${registry.type}s/${registry.name}`;
  // Is there a tarball?
  const tarball = fs.existsSync(`${modulePath}/files.tar`);
  // If there is a tarball, extract it
  if (tarball) {
    await tar.extract({
      file: `${modulePath}/files.tar`,
      cwd: outputPath
    });
    // Remove the tarball
    fs.unlinkSync(`${modulePath}/files.tar`);
  } else {
    // get the directory contents
    const files = fs.readdirSync(modulePath);
    // filter out the ignore files
    const filteredFiles = files.filter(
      (file: string) => !ignoreFiles.includes(file)
    );
    // write the files to the output directory
    filteredFiles.forEach(async (file: string) => {
      const srcPath = `${modulePath}/${file}`;
      await createDir(outputPath).then(() => {
        fs.copyFileSync(srcPath, `${outputPath}/${file}`);
      });
    });
  }

  // Write the registry to the output directory
  fs.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));

  return registry;
};

export default addLocalModule;
