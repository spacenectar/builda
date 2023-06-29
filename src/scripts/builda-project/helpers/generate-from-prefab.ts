import axios from 'axios';

import fs from 'node:fs';
import path from 'node:path';

import {
  addLocalModule,
  addRemoteModule,
  convertRegistryPathToUrl,
  copyDir,
  copyPathsToRoot,
  createDir,
  detectPathType,
  loopAndRewriteFiles,
  printMessage,
  throwError,
  writeFile,
  changeCase
} from 'helpers';
import { ModuleRegistry } from 'types/module-registry';

export async function generateFromPrefab(
  prefabPath: string,
  module: ModuleRegistry,
  rootDir: string,
  defaultRequiredFiles: string[],
  prefabDir: string,
  workingDir: string,
  name: string,
  buildaDir: string,
  websiteUrl: string,
  buildaReadmeFileName: string
): Promise<ModuleRegistry> {
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
  const substitutions = module?.generatorOptions?.substitutions || [];

  printMessage(`Installed ${prefabName}@${version}`, 'success');

  printMessage('Creating export path...', 'processing');

  // Copy the prefab files to the export directory
  copyDir(prefabDir, workingDir);

  printMessage('Export path created', 'success');

  printMessage('Copying required files to application...', 'copying');

  const substitute = [
    ...substitutions,
    {
      replace: '%APP_NAME%',
      with: changeCase(name, 'kebabCase')
    }
  ];

  // Copy all required files
  await loopAndRewriteFiles({ name, paths: defaultRequiredFiles, substitute });
  const buildaPath = path.join(workingDir, buildaDir);

  const rootFiles = module?.generatorOptions?.rootFiles || [];
  // Copy all rootFiles into the application root
  await copyPathsToRoot(rootFiles, rootDir);

  // Create any extraFolders in the application root
  module?.generatorOptions?.extraFolders?.forEach(async (folder) => {
    fs.mkdirSync(path.join(rootDir, folder), { recursive: true });
    // add a .gitkeep file to the folder
    fs.writeFileSync(path.join(rootDir, folder, '.gitkeep'), '');
  });

  // Copy any applicationOnlyFiles to the application root and rewrite them
  // TODO:
  // - only rewrite files that have substitutions
  // - This isn't working for some reason, the substitutions aren't being applied
  module?.generatorOptions?.applicationOnlyFiles?.forEach(async (file) => {
    const prefabDir = path.join(buildaDir, 'modules', 'prefab');
    const filePath = path.join(prefabDir, file.path);
    const outputDir = path.join(rootDir, path.dirname(file.path));
    const fileName = path.basename(file.path);
    // Check if the file is a directory
    if (fs.lstatSync(filePath).isDirectory()) {
      throw new Error(
        'Directories are not allowed in applicationOnlyFiles, please use rootFiles instead'
      );
    } else {
      // Copy the file to the root directory
      await writeFile({
        file: filePath,
        outputDir,
        rename: fileName.replace('.aof', ''),
        substitute: file.substitutions,
        name
      });
    }
  });

  // Create a new package.json file in the root directory
  const packageJsonFile = fs.readFileSync(
    path.resolve(workingDir, 'package.json'),
    {
      encoding: 'utf8'
    }
  );
  const packageJson = JSON.parse(packageJsonFile);

  // Update the scripts entry to use 'builda execute'
  const scripts = packageJson.scripts as Record<string, string>;
  const buildaScripts = {} as Record<string, string>;

  Object.entries(scripts).forEach(([key, value]) => {
    if (
      value.startsWith('builda') ||
      value.startsWith('run-s') ||
      value.startsWith('run-p') ||
      value.startsWith('npm-run-all') ||
      value.startsWith('concurrently')
    ) {
      // We don't want to replace `builda`, `npm-run-all` or `concurrently` scripts, so we just copy them over
      // TODO: Add docs to show that builda scripts should not be used in conjunction with other scripts
      // add a suggestion to put the builda script in its own script and call that script from the other
      // script using one of the supported methods
      /**
       * e.g.
       * {
       *   "watch": "builda --watch",
       *   "dev": "run-p watch other-script"
       * }
       */
      buildaScripts[key] = value;
    } else {
      buildaScripts[key] = `builda x ${key}`;
    }
  });

  // Create a new package.json file in the root directory with updated details
  const newPackageJson = {
    ...packageJson,
    scripts: buildaScripts
  };

  fs.writeFileSync(
    path.join(rootDir, 'package.json'),
    JSON.stringify(newPackageJson, null, 2)
  );

  // Add the default prefab readme to the root directory
  const prefabReadmeUrl = `${websiteUrl}/assets/prefab-getting-started.md`;

  const readmeSubs = [
    {
      replace: '%PREFAB_NAME%',
      with: prefabName
    },
    {
      replace: '%PREFAB_URL%',
      with: module.url
    },
    {
      replace: '%PREFAB_VERSION%',
      with: version
    }
  ];

  // Download the prefab readme and add it to the root directory
  // If the download fails, we just ignore it and continue with a warning message
  await axios
    .get(prefabReadmeUrl, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .then((res) => {
      if (res.status === 200) {
        writeFile({
          content: res.data,
          rename: buildaReadmeFileName,
          outputDir: rootDir,
          substitute: readmeSubs
        });
      }
    })
    .catch((err) => {
      console.log(err);
      printMessage(
        `Could not download the getting started file. Visit ${websiteUrl}/docs/getting-started#prefab for assistance`,
        'warning'
      );
    });

  // Delete the .builda directory from the export directory
  if (fs.existsSync(buildaPath)) {
    fs.rmSync(buildaPath, { recursive: true });
  }

  // Install any blueprint dependencies
  if (module.blueprints) {
    printMessage('Installing prefab blueprints...', 'installing');
    const blueprintPromises = [];
    // Convert the blueprints to an array
    const blueprints = Object.keys(module.blueprints);
    for (const blueprint of blueprints) {
      const bp = module.blueprints[blueprint];
      printMessage(`installing ${blueprint}`, 'processing');
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
  printMessage('All files copied to application.', 'success');
  return module;
}
