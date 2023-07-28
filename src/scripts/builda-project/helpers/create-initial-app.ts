import axios from 'axios';

import fs from 'node:fs';
import path from 'node:path';

import {
  convertToBuildaScript,
  copyPathsToRoot,
  loopAndRewriteFiles,
  printMessage,
  throwError,
  writeFile,
  changeCase
} from 'helpers';

interface ICreateInitialApp {
  // The module registry object
  module: ModuleRegistry;
  // The root directory of the project
  rootDir: string;
  // The path to the prefab directory
  prefabDir: string;
  // The name of the app
  name: string;
  // The path to the .builda directory
  buildaDir: string;
  // The website url for builda
  websiteUrl: string;
  // The name of the builda readme file
  buildaReadmeFileName: string;
}

export async function createInitialApp({
  module,
  rootDir,
  prefabDir,
  name,
  buildaDir,
  websiteUrl,
  buildaReadmeFileName
}: ICreateInitialApp): Promise<ModuleRegistry> {
  const exportDir = path.join(rootDir, buildaDir, 'export');
  if (!fs.existsSync(exportDir)) {
    throwError('No export directory found');
  }

  module?.generatorOptions?.rootFiles?.forEach(async (file) => {
    if (typeof file === 'string') {
      // If the file is a string then it needs to be copied to the root directory
      copyPathsToRoot([file], rootDir);
    } else {
      // If the file is a RootFile object then it needs to be rewritten
      // with the correct substitutions
      const substitute = file.substitutions ?? [];
      await loopAndRewriteFiles({
        log: true,
        name,
        paths: [file.path],
        substitute,
        source: prefabDir.replace(`${rootDir}/`, ''),
        destination: rootDir
      });
    }
  });

  // Create any extraFolders in the application root
  module?.generatorOptions?.extraFolders?.forEach(async (folder) => {
    fs.mkdirSync(path.join(rootDir, folder), { recursive: true });
    // add a .gitkeep file to the folder
    fs.writeFileSync(path.join(rootDir, folder, '.gitkeep'), '');
  });

  // Take a copy of the package.json file from the prefab directory
  const packageJsonFile = fs.readFileSync(
    path.resolve(prefabDir, 'package.json'),
    {
      encoding: 'utf8'
    }
  );
  const packageJson = JSON.parse(packageJsonFile);

  // Create a new package.json object with the app name
  const newPackageJson = {
    ...packageJson,
    name: changeCase(name, 'kebabCase')
  };

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
      with: module.name
    },
    {
      replace: '%PREFAB_URL%',
      with: module.url
    },
    {
      replace: '%PREFAB_VERSION%',
      with: module.version
    }
  ];

  // Download the getting started with prefabs readme and add it to the root directory
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
  printMessage('All files copied to application.', 'success');
  return module;
}
