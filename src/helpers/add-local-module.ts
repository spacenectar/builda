import fs from 'node:fs';
import tar from 'tar';
import path from 'node:path';

import ModuleRegistry from '@typedefs/module-registry';
import createDir from './create-dir';
import getRegistry from './get-registry';
import globals from '@data/globals';
import ignoreFile from '@data/ignore-file.json';
// Ignore these files
const ignoreFiles = ignoreFile.ignore;

const getFiles = async (
  modulePath: string,
  outputPath: string,
  location: string
) => {
  // Is there a tarball?
  const tarball = fs.existsSync(`${modulePath}/${location}.tgz`);
  // If there is a tarball, copy it to the output path and then extract it
  if (tarball) {
    fs.copyFileSync(
      `${modulePath}/${location}.tgz`,
      `${outputPath}/${location}.tgz`
    );
    await tar.extract({
      file: `${outputPath}/${location}.tgz`,
      cwd: outputPath
    });
    // Remove the tarball
    fs.unlinkSync(`${outputPath}/${location}.tgz`);
  } else {
    // get the directory contents
    const files = fs.readdirSync(path.join(modulePath, location));
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
};

export const addLocalModule = async (
  modulePath: string,
  output?: string
): Promise<ModuleRegistry> => {
  const buildaDir = path.join(output || './', globals.buildaDir);

  // get the registry data
  const registry = await getRegistry(modulePath);
  // Set the output path
  const outputPath =
    registry.type === 'blueprint'
      ? `${buildaDir}/modules/blueprints/${registry.name}`
      : `${buildaDir}/modules/prefab`;
  await createDir(outputPath);

  // Get the files
  await getFiles(modulePath, outputPath, 'files');

  // Write the registry to the output directory
  fs.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));

  return registry;
};

export default addLocalModule;
