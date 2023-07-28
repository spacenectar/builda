import fs from 'node:fs';
import path from 'node:path';

import {
  addLocalModule,
  addRemoteModule,
  convertRegistryPathToUrl,
  copyDir,
  createDir,
  detectPathType,
  loopAndRewriteFiles,
  printMessage,
  throwError
} from 'helpers';

interface IGenerateFromPrefab {
  // The path to the prefab module
  prefabPath: string;
  // The root directory of the project
  rootDir: string;
  // The path to the prefab directory
  prefabDir: string;
  // The name of the prefab
  name: string;
  // The path to the .builda directory
  buildaDir: string;
}

export async function generateFromPrefab({
  prefabPath,
  rootDir,
  prefabDir,
  name,
  buildaDir
}: IGenerateFromPrefab): Promise<ModuleRegistry> {
  let module;
  if (detectPathType(prefabPath) === 'remote') {
    const registry = convertRegistryPathToUrl({
      registryPath: prefabPath
    }).url;
    if (!registry) {
      throwError('No registry found');
    }
    module = await addRemoteModule(registry, rootDir);
  } else {
    module = await addLocalModule(prefabPath, rootDir);
  }

  if (!module?.name) {
    throwError('No prefab found');
  }

  const prefabName = module.name;
  const version = module.version;

  printMessage(`Installed ${prefabName}@${version}`, 'success');

  module?.generatorOptions?.rootFiles?.forEach(async (file) => {
    if (typeof file !== 'string') {
      // If the file is a RootFile object then it needs to be rewritten
      // with the correct substitutions
      const substitute = file.substitutions ?? [];
      await loopAndRewriteFiles({
        name,
        paths: [file.path],
        substitute,
        source: prefabDir,
        destination: prefabDir
      });
    }
  });

  // Install any blueprint dependencies
  if (module.blueprints) {
    printMessage('Installing prefab blueprints...', 'installing');
    const blueprintPromises = [];
    // Convert the blueprints to an array
    const blueprints = Object.keys(module.blueprints);
    for (const blueprint of blueprints) {
      const bp = module.blueprints[blueprint] as ModuleConfigContents;
      printMessage(`Installing blueprint: "${blueprint}"`, 'processing');
      const blueprintDest = path.join(
        rootDir,
        buildaDir,
        'modules',
        'blueprints'
      );
      createDir(blueprintDest);
      if (bp.location === 'prefab') {
        // Copy the 'blueprints' folder from the prefab to the .builda folder
        const blueprintSrc = path.join(
          prefabDir,
          buildaDir,
          'modules',
          'blueprints',
          blueprint
        );

        if (fs.existsSync(blueprintSrc)) {
          copyDir(blueprintSrc, path.join(blueprintDest, blueprint));
        }
      } else {
        // Install the blueprint from the registry
        const bluePrintType = detectPathType(bp.location);
        blueprintPromises.push(
          new Promise((resolve) => {
            if (bluePrintType === 'local') {
              addLocalModule(bp.location, rootDir);
            }
            if (bluePrintType === 'remote') {
              const registry = convertRegistryPathToUrl({
                registryPath: bp.location
              }).url;
              if (!registry) {
                throwError('No registry found');
              }

              addRemoteModule(registry, rootDir);
            }
            resolve(blueprint);
          })
        );
      }
      printMessage(`${blueprint} installed`, 'success');
    }

    await Promise.all(blueprintPromises);
  }
  printMessage('Prefab has been set up.', 'success');
  return module;
}

export default generateFromPrefab;
