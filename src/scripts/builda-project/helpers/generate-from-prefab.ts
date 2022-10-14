import axios from 'axios';
import execa from 'execa';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import {
  addLocalModule,
  addRemoteModule,
  convertRegistryPathToUrl,
  copyDir,
  createDir,
  detectPathType,
  loopAndRewriteFiles,
  printMessage,
  throwError,
  writeFile,
  changeCase
} from 'helpers';
import ModuleRegistry from 'types/module-registry';
import { TFlatObject } from 'types/flat-object';

export async function generateFromPrefab(
  prefabPath: string,
  module: ModuleRegistry,
  rootDir: string,
  defaultRequiredFiles: string[],
  prefabDir: string,
  workingDir: string,
  name: string,
  packageManagerType: string,
  buildaDir: string,
  configFileName: string,
  appName: string | undefined,
  websiteUrl: string,
  buildaReadmeFileName: string,
  autoInstall: boolean | undefined,
  answers: TFlatObject
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
  const substitutions = module.substitute || [];

  const extraRootfiles =
    module.appFiles
      ?.filter((file) => {
        if (!file.rewrite) {
          return file;
        }
        return false;
      })
      .map((f) => f.path) || [];

  const extraRootfilesToRewrite =
    module.appFiles?.filter((file) => {
      if (file.rewrite) {
        return file;
      }
      return false;
    }) || [];

  const requiredFiles = [...defaultRequiredFiles, ...(extraRootfiles || [])];
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
    },
    {
      replace: '%APP_ROOT%',
      with: './'
    },
    {
      replace: '%PACKAGE_MANAGER%',
      with: packageManagerType
    }
  ];

  // Copy all required files
  await loopAndRewriteFiles({ name, paths: requiredFiles, substitute });
  const buildaPath = path.join(workingDir, buildaDir);
  const buildaConfigPath = path.resolve(buildaPath, configFileName);

  // If there are extra files which need to be rewritten, do that now
  if (extraRootfilesToRewrite.length > 0) {
    const paths = extraRootfilesToRewrite.map((f) => f.path);
    const extraSubstitutions = extraRootfilesToRewrite
      .map((f) => f.substitutions)
      .flat()
      .concat(substitutions);

    await loopAndRewriteFiles({
      name,
      paths,
      substitute: extraSubstitutions
    });
  }

  //TODO: We need a function to loop through the appFiles and copy them to the root directory. There should possibly also
  // be a sync function to copy the files back to the export directory. This could be part of the 'build' command.
  // It would also be good if users could choose to add the path to the files they want to the `appFiles` array in the
  // config file OR just copy the files manually. Either way, the `build` function should keep both the files and the config
  // in sync, e.g. Any files added to the root dir should appear in the `appFiles` array on build and vice versa.
  // Copy config.json from working builda directory to root directory
  if (fs.existsSync(buildaConfigPath)) {
    fs.copyFileSync(buildaConfigPath, path.join(rootDir, configFileName));
  }

  // Create a new package.json file in the root directory with updated scripts
  const packageJsonFile = fs.readFileSync(
    path.resolve(workingDir, 'package.json'),
    {
      encoding: 'utf8'
    }
  );
  const packageJson = JSON.parse(packageJsonFile);

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
      buildaScripts[key] = `builda -x ${key}`;
    }
  });

  // If there is a 'uniqueInstances' array in the config file, loop through and copy the .unique version of those files
  // to the root directory without the .unique extension
  if (module.uniqueInstances && module.uniqueInstances.length > 0) {
    module.uniqueInstances.forEach((file) => {
      const rewrite = file.rewrite || false;
      const uniqueFile = path.join(workingDir, file.path);
      const uniqueFileSrcDir = path.dirname(uniqueFile);
      if (rewrite) {
        const uniqueFileContents = fs.readFileSync(uniqueFile, {
          encoding: 'utf8'
        });
        const uniqueFileSubs =
          [...substitute, file.substitutions].flat() || substitute;

        writeFile({
          file: uniqueFile,
          content: uniqueFileContents,
          substitute: uniqueFileSubs,
          name: appName,
          rename: uniqueFile.replace('.unique', ''),
          outputDir: uniqueFileSrcDir.replace(workingDir, rootDir)
        });
      } else {
        fs.copyFileSync(
          uniqueFile,
          path.join(
            uniqueFileSrcDir.replace(workingDir, rootDir),
            file.path.replace('.unique', '')
          )
        );
      }
    });
  }

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

  if (autoInstall || answers.autoInstall) {
    printMessage('Installing dependencies...', 'config');

    // Run package manager install
    if (fs.existsSync(path.resolve(workingDir, 'package.json'))) {
      printMessage(`Running ${packageManagerType} install`, 'processing');
      try {
        const childProcess = execa(packageManagerType, ['install'], {
          cwd: rootDir,
          all: true,
          stdio: 'inherit'
        });
        childProcess?.all?.pipe(process.stdout);
        await childProcess;
        printMessage('All dependencies installed.', 'success');
      } catch (error) {
        printMessage(
          `Failed to run. Please try running '${packageManagerType} install' manually.`,
          'error'
        );
        //TODO : Add this documentation
        printMessage(
          `For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`,
          'primary'
        );
      }
    } else {
      printMessage('No package.json found. Skipping install.', 'notice');
    }
  } else {
    printMessage(
      `Dependencies have not been installed. To install dependencies, run: '${packageManagerType} install'`,
      'notice'
    );
  }
  return module;
}
