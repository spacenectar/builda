import fs from 'node:fs';
import path from 'node:path';

import { ConfigFile } from 'types/config-file';

// Import globals
import globals from 'data/globals';

// Import scripts
import {
  addLocalModule,
  addRemoteModule,
  convertRegistryPathToUrl,
  copyDir,
  copyPath,
  detectPathType,
  getConfig,
  printMessage,
  throwError
} from 'helpers';

export type InstallModulesResponse = {
  config: ConfigFile;
};

export default async () => {
  // Install any builda modules defined in the config
  const config = getConfig();
  const { prefab, blueprints } = config;
  const { buildaDir } = globals;
  const outputPath = process.cwd();

  // Check the module directory exists and create it if it doesn't
  const moduleDirPath = path.join(outputPath, buildaDir, 'modules');
  if (!fs.existsSync(moduleDirPath)) {
    fs.mkdirSync(moduleDirPath, { recursive: true });
  }

  printMessage('Installing modules...', 'info');
  printMessage('Looking for prefab...', 'processing');
  if (prefab) {
    if (!fs.existsSync(path.join(moduleDirPath, 'prefab'))) {
      fs.mkdirSync(moduleDirPath, { recursive: true });
    } else {
      throwError('prefab directory already exists, aborting');
    }
    printMessage('Prefab found', 'success');

    if (!prefab.location) {
      throwError('No prefab location found');
    }

    if (prefab.location === 'prefab') {
      throwError(
        'Prefab location cannot be "prefab". Please specify a specific location'
      );
    }

    if (!prefab.version) {
      printMessage(
        'No prefab version specified, using the location entry as full path to prefab',
        'warning'
      );
    }

    const basePath = prefab.version
      ? `${prefab.location}/v/${prefab.version}`
      : prefab.location;

    if (detectPathType(basePath) === 'remote') {
      const installPath = convertRegistryPathToUrl({
        registryPath: basePath
      }).url;

      await addRemoteModule(installPath);
    } else {
      await addLocalModule(basePath);
    }

    // Check the prefab was installed successfully
    const prefabPath = path.join(moduleDirPath, 'prefab');
    if (fs.existsSync(prefabPath)) {
      printMessage('Prefab installed successfully', 'success');
      printMessage('Creating export folder...', 'processing');
      const workingDir = path.join(outputPath, globals.buildaDir);
      const prefabRoot = path.join(workingDir, 'modules', 'prefab');
      const exportRoot = path.join(workingDir, 'export');
      // Create the export directory if it doesn't exist
      if (!fs.existsSync(exportRoot)) {
        fs.mkdirSync(exportRoot, { recursive: true });

        copyPath(prefabRoot, exportRoot);

        // Remove the builda directory from the export directory
        if (fs.existsSync(path.join(exportRoot, globals.buildaDir))) {
          fs.rmSync(path.join(exportRoot, globals.buildaDir), {
            force: true,
            recursive: true
          });
        }

        printMessage('Export folder created successfully', 'success');
      }
    } else {
      throwError('Prefab installation failed');
    }
  } else {
    printMessage('No prefab found, skipping...', 'info');
  }

  printMessage('Looking for blueprints...', 'processing');
  if (blueprints) {
    printMessage('Blueprints found', 'success');

    const blueprintsArray = Object.entries(blueprints);

    for (const [blueprintName, blueprint] of blueprintsArray) {
      if (!blueprint.version && blueprint.location !== 'prefab') {
        printMessage(
          `No version specified for ${blueprintName}, using location entry as full path to blueprint`,
          'warning'
        );
      }

      if (!blueprint.location) {
        throwError(`No blueprint path found for ${blueprintName}`);
      }

      if (
        !fs.existsSync(path.join(moduleDirPath, 'blueprints', blueprintName))
      ) {
        fs.mkdirSync(moduleDirPath, { recursive: true });
      } else {
        throwError(`blueprint ${blueprintName} already exists, aborting`);
      }

      if (blueprint.location === 'prefab') {
        // Copy the 'blueprints' folder from the prefab to the .builda folder
        const blueprintSrc = path.join(
          moduleDirPath,
          'prefab',
          '.builda',
          'modules',
          'blueprints',
          blueprintName
        );

        if (fs.existsSync(blueprintSrc)) {
          copyDir(
            blueprintSrc,
            path.join(moduleDirPath, 'blueprints', blueprintName)
          );
        } else {
          throwError(`No blueprint found in prefab for ${blueprintName}`);
        }
      } else {
        const basePath = blueprint.version
          ? `${blueprint.location}/v/${blueprint.version}`
          : blueprint.location;

        if (detectPathType(basePath) === 'remote') {
          const installPath = convertRegistryPathToUrl({
            registryPath: basePath
          }).url;

          await addRemoteModule(installPath);
        } else {
          await addLocalModule(basePath);
        }
      }
      // Check the blueprint was installed successfully

      if (
        fs.existsSync(path.join(moduleDirPath, 'blueprints', blueprintName))
      ) {
        printMessage(
          `Blueprint ${blueprintName} installed successfully`,
          'success'
        );
      } else {
        throwError(`Blueprint ${blueprintName} installation failed`);
      }
    }
  } else {
    printMessage('No blueprints found, skipping...', 'info');
  }
};
