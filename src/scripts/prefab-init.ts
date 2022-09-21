import fs from 'node:fs';
import path from 'node:path';
import glob from 'glob';
import execa from 'execa';
import axios from 'axios';

import globals from '@data/globals';
import {
  askQuestion,
  printMessage,
  throwError,
  addLocalModule,
  addRemoteModule,
  detectPathType,
  convertRegistryPathToUrl,
  writeFile,
  createDir,
  copyDir
} from '@helpers';
import changeCase from '@helpers/string-functions';
import ModuleRegistry from '@typedefs/module-registry';

const questions = [
  {
    type: 'input',
    name: 'appName',
    message: 'What is the name of your application?',
    default: 'my-app',
    validate: (input: string) => {
      if (input.length) {
        return true;
      } else {
        return 'Please enter a name for your application';
      }
    }
  },
  {
    type: 'input',
    name: 'pathName',
    message: 'What is the path to the prefab?',
    default: 'github:builda-modules/prefab-test@latest',
    validate: (input: string) => {
      if (input.length) {
        return true;
      } else {
        return 'Please enter a path to the prefab';
      }
    }
  },
  {
    type: 'list',
    name: 'yarnOrNpm',
    message: 'Which package manager would you like to use?',
    default: 'npm',
    choices: ['npm', 'yarn']
  },
  {
    type: 'confirm',
    name: 'autoInstall',
    message: 'Would you like to automatically install all dependencies?',
    default: true
  }
];

const getAnswers = async (
  omitName: boolean,
  omitPathName: boolean,
  omitYarnOrNpm: boolean
) => {
  return new Promise((resolve) => {
    const questionList = questions.filter((question) => {
      if (omitName && question.name === 'appName') {
        return false;
      }
      if (omitPathName && question.name === 'pathName') {
        return false;
      }
      if (omitYarnOrNpm && question.name === 'yarnOrNpm') {
        return false;
      }

      return true;
    });

    askQuestion({
      questionList
    }).then((answers) => {
      return resolve(answers);
    });
  });
};

type Answers = {
  appName: string;
  pathName: string;
  yarnOrNpm: string;
  autoInstall: boolean;
};

type TInitOptions = {
  presetAnswers?: Answers;
  appName?: string;
  outputDirectory?: string;
  pathName?: string;
  packageManager?: string;
};

export const prefabInit = async ({
  presetAnswers,
  appName,
  outputDirectory,
  pathName,
  packageManager
}: TInitOptions) => {
  const { buildaDir, websiteUrl, configFileName, buildaReadmeFileName } =
    globals;

  const defaultRequiredFiles = [
    buildaDir,
    `${buildaDir}/${configFileName}`,
    'package.json',
    'README.md'
  ];

  const answers =
    presetAnswers ||
    ((await getAnswers(!!appName, !!pathName, !!packageManager)) as Answers);

  const name = appName || answers.appName;
  const outputDir = outputDirectory || answers.appName;
  const prefabPath = pathName || answers.pathName;
  const packageManagerType = packageManager || answers.yarnOrNpm || 'npm';

  await createDir(outputDir);

  // check if the root directory is empty
  const rootDir = path.resolve(outputDir);
  const workingDir = path.join(outputDir, buildaDir, 'export');

  if (fs.readdirSync(rootDir).length !== 0) {
    return throwError(
      `The directory: '${rootDir}' already exists. It is not recommended to install a prefab into an existing project.`
    );
  } else {
    await createDir(workingDir);

    // The directory is empty, so we can continue
    let module = {} as ModuleRegistry;
    const moduleType = detectPathType(prefabPath);

    if (moduleType === 'local') {
      module = await addLocalModule(prefabPath, outputDir);
    }

    if (moduleType === 'remote') {
      module = await addRemoteModule(
        convertRegistryPathToUrl(prefabPath),
        outputDir
      );
    }

    if (moduleType === 'custom') {
      module = await addRemoteModule(
        convertRegistryPathToUrl(prefabPath),
        outputDir
      );
    }

    if (module?.name) {
      const prefabName = module.name;
      const version = module.version;
      const substitutions = module.substitute || [];

      const prefabDir = path.join(
        outputDir,
        buildaDir,
        'modules/prefab',
        'files'
      );

      const requiredFiles = [
        ...defaultRequiredFiles,
        ...(module.custom_files || [])
      ];
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

      const fileLoop = async (pathString: string[]) => {
        const promises = [];
        for (const file of pathString) {
          const filePath = path.join(prefabDir, file);
          // Check if file is glob
          if (file.includes('*')) {
            const globFiles = glob.sync(file);
            promises.push(await fileLoop(globFiles));
          } else if (fs.lstatSync(filePath).isDirectory()) {
            const files = fs.readdirSync(filePath);
            const newFiles = files.map((f) => path.join(file, f));
            promises.push(await fileLoop(newFiles));
          } else {
            promises.push(
              new Promise((resolve) => {
                const directoryPathWithoutFile = path.dirname(file);
                const directoryPath = path.join(
                  workingDir,
                  directoryPathWithoutFile
                );
                createDir(directoryPath);
                if (fs.existsSync(filePath)) {
                  writeFile({
                    file: filePath,
                    output_dir: directoryPath,
                    substitute,
                    name
                  });
                }
                resolve(filePath);
              })
            );
          }
        }
        // Wait for all promises to resolve
        await Promise.all(promises);
      };

      // Copy all required files
      await fileLoop(requiredFiles);
      const buildaPath = path.join(workingDir, buildaDir);
      const buildaConfigPath = path.resolve(buildaPath, configFileName);

      // Copy config.json from working builda directory to root directory
      if (fs.existsSync(buildaConfigPath)) {
        fs.copyFileSync(buildaConfigPath, path.join(rootDir, configFileName));
      }

      // Create a new package.json file in the root directory with updated scripts
      const packageJson = require(path.resolve(workingDir, 'package.json'));
      const scripts = packageJson.scripts as Record<string, string>;
      const buildaScripts = {} as Record<string, string>;

      Object.entries(scripts).forEach(([key, value]) => {
        if (value.startsWith('builda')) {
          // We don't want to replace builda scripts, so we just copy them over
          // TODO: Add docs to show that builda scripts should not be used in conjunction with other scripts
          // add a suggestion to put the builda script in its own script and call that script from the other
          // script using npm-run-all or concurrently
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

      const newPackageJson = {
        ...packageJson,
        scripts: buildaScripts
      };

      fs.writeFileSync(
        path.join(rootDir, 'package.json'),
        JSON.stringify(newPackageJson, null, 2)
      );

      // Add the default prefab readme to the root directory

      // Download the prefab readme from the builda website (if possible)
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
              output_dir: rootDir,
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
            outputDir,
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
                  addLocalModule(bp.location, outputDir);
                }
                if (bluePrintType === 'remote') {
                  addRemoteModule(
                    convertRegistryPathToUrl(bp.location),
                    outputDir
                  );
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

      if (answers.autoInstall) {
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
            return printMessage(
              `For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`,
              'primary'
            );
          }
        } else {
          return printMessage(
            'No package.json found. Skipping install.',
            'notice'
          );
        }
      } else {
        printMessage(
          `Dependencies have not been installed. To install dependencies, run: '${packageManagerType} install'`,
          'notice'
        );
      }
      execa('cd', [name]);
      printMessage(
        `Your application, "${name}" has been initialised!`,
        'success'
      );
      return printMessage(
        `For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`,
        'primary'
      );
    }
    return throwError('No prefab found');
  }
};

export default prefabInit;
