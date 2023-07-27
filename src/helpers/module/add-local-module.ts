import fs from 'node:fs';
import tar from 'tar';
import path from 'node:path';

import { createDir, getRegistry, throwError } from 'helpers';
import globals from 'data/globals';

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
    throwError('No tarball found. Please run `builda package` first');
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
  await getFiles(modulePath, outputPath, 'module');

  // Write the registry to the output directory
  fs.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));

  return registry;
};

export default addLocalModule;
