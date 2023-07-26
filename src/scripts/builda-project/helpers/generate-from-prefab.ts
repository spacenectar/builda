import axios from 'axios';

import fs from 'node:fs';
import path from 'node:path';

import {
  addLocalModule,
  addRemoteModule,
  convertRegistryPathToUrl,
  convertToBuildaScript,
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
  const substitutions = module?.generatorOptions?.substitutions ?? [];

  printMessage(`Installed ${prefabName}@${version}`, 'success');

  printMessage('Creating export path...', 'processing');

  // Copy the prefab files to the export directory
  copyDir(prefabDir, workingDir);

  printMessage('Export path created', 'success');

  printMessage('Copying required files to application...', 'copying');

  // Copy all required files
  await loopAndRewriteFiles({
    name,
    paths: defaultRequiredFiles,
    substitute: [
      ...substitutions,
      {
        replace: '%APP_NAME%',
        with: changeCase(name, 'kebabCase')
      }
    ]
  });
  const buildaPath = path.join(workingDir, buildaDir);

  // Create a new package.json file in the root directory
  const packageJsonFile = fs.readFileSync(
    path.resolve(workingDir, 'package.json'),
    {
      encoding: 'utf8'
    }
  );
  const packageJson = JSON.parse(packageJsonFile);

  const newPackageJson = {
    ...packageJson,
    name: changeCase(name, 'kebabCase')
  };

  module?.generatorOptions?.rootFiles?.forEach(async (file) => {
    const filePath = typeof file === 'string' ? file : file.path;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    if (typeof file === 'string') {
      // If the file is just a string, copy that file to the root
      await copyPathsToRoot([file], rootDir);
    } else {
      // If the file is a RootFile object, copy the file to the root and rewrite it
      const substitute = file.substitutions ?? [];
      await loopAndRewriteFiles({
        name,
        paths: [file.path],
        substitute,
        fromCustomPath: rootDir,
        toRoot: true
      });
    }
    // If the file name starts with 'unique.' it requires some processing
    if (fileName.startsWith('unique.')) {
      // Delete the copy in the export directory
      fs.unlinkSync(path.join(workingDir, fileDir, fileName));
      // Rename the copy to remove the 'unique.' prefix
      const newFileName = fileName.replace('unique.', '');
      printMessage(`Found unique file`, 'processing');
      fs.renameSync(
        path.join(rootDir, fileDir, fileName),
        path.join(rootDir, fileDir, newFileName)
      );
      printMessage(`Renamed unique file to: ${newFileName}`, 'success');
      // Add the unique file to the `ignored` array in the builda config
      const existingBuildaConfig = packageJson.builda || {};
      const buildaConfig = {
        ...existingBuildaConfig,
        ignored: [
          ...(existingBuildaConfig.ignored || []),
          path.join(fileDir, newFileName)
        ]
      };

      newPackageJson.builda = buildaConfig;
    }
  });

  // Create any extraFolders in the application root
  module?.generatorOptions?.extraFolders?.forEach(async (folder) => {
    fs.mkdirSync(path.join(rootDir, folder), { recursive: true });
    // add a .gitkeep file to the folder
    fs.writeFileSync(path.join(rootDir, folder, '.gitkeep'), '');
  });

  // Update the scripts entry to use 'builda execute'
  const scripts = packageJson.scripts as Record<string, string>;
  const buildaScripts = {} as Record<string, string>;

  Object.entries(scripts).forEach(([key, value]) => {
    buildaScripts[key] = convertToBuildaScript(key, value);
  });

  // Create a new package.json file in the root directory with updated details
  newPackageJson.scripts = buildaScripts;

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
  printMessage('All files copied to application.', 'success');
  return module;
}
