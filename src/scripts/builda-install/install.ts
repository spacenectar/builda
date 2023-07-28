import fs from 'node:fs';
import path from 'node:path';

// Import globals
import globals from 'data/globals';

// Import scripts
import {
  confirm,
  printMessage,
  generateExport,
  generateFromPrefab,
  getRegistry,
  syncPackageJson,
  throwError
} from 'helpers';

export type InstallModulesResponse = {
  config: ConfigFile;
};
/**
 * Install the prefab
 * @param update - Whether the install is being run as part of an update (default: false)
 */
export default async (update?: boolean) => {
  // Install any builda modules defined in the config
  const { buildaDir } = globals;
  const rootDir = process.cwd();
  const buildaPath = path.join(rootDir, buildaDir);
  let configFile;
  let buildaConfig;

  if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
    configFile = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')
    );
    buildaConfig = configFile.builda;
    if (!buildaConfig) {
      throwError('No "builda" entry found in package.json');
    }
  }

  const appName = configFile.name;

  if (fs.existsSync(buildaDir) && !update) {
    printMessage(
      'A .builda directory already exists. The directory will be deleted and rebuilt from the prefab.',
      'warning'
    );
    const userConfirm = await confirm('Do you wish to proceed?');

    if (!userConfirm) {
      printMessage('Installation aborted', 'error');
      process.exit(1);
    }
  }

  if (update) {
    printMessage(`Updating ${appName}`, 'installing');
  } else {
    printMessage(`Installing ${appName}`, 'installing');
  }

  const prefabPath = `${buildaConfig.prefab?.location}`;
  // Check the module directory exists and create it if it doesn't
  const prefabDir = path.join(buildaPath, 'modules', 'prefab');

  await generateFromPrefab({
    prefabPath,
    rootDir,
    prefabDir,
    name: appName,
    buildaDir
  });

  // Create the export directory and populate it from the prefab
  await generateExport({ buildaDir, prefabDir });

  // Sync the package.json file
  await syncPackageJson();

  // Get the registry from the newly installed prefab
  const registry = await getRegistry(prefabDir);

  const prefabName = registry.name.replace('prefab-', '');
  const prefabVersion = registry.version;

  if (update) {
    printMessage(`${prefabName}, been updated to v${prefabVersion}`, 'success');
  } else {
    printMessage(
      `${prefabName}, v${prefabVersion} has been installed`,
      'success'
    );
  }
};
