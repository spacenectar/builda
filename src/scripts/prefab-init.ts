import fs from 'node:fs';
import path from 'node:path';
import execa from 'execa';

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
  createDir
} from '@helpers';
import ModuleRegistry from '@typedefs/module-registry';

const defaultRequiredFiles = ['package.json', 'README.md'];

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
    name: 'outputDirectory',
    message: 'Where would you like to output your application?',
    default: './test-path',
    validate: (input: string) => {
      if (input.length) {
        return true;
      } else {
        return 'Please enter a directory for your application';
      }
    }
  },
  {
    type: 'input',
    name: 'pathName',
    message: 'What is the path to the prefab?',
    default: 'github:builda-modules/prefab-test',
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
  }
];

const getAnswers = async (
  omitName: boolean,
  omitOutputDir: boolean,
  omitPathName: boolean,
  omitYarnOrNpm: boolean
) => {
  return new Promise((resolve) => {
    const questionList = questions.filter((question) => {
      if (omitName && question.name === 'appName') {
        return false;
      }
      if (omitOutputDir && question.name === 'outputDirectory') {
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
  outputDirectory: string;
  pathName: string;
  yarnOrNpm: string;
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
  const { configFileName, buildaDir, websiteUrl } = globals;

  const answers =
    presetAnswers ||
    ((await getAnswers(
      !!appName,
      !!outputDirectory,
      !!pathName,
      !!packageManager
    )) as Answers);

  const name = appName || answers.appName;
  const outputDir = outputDirectory || answers.outputDirectory;
  const prefabPath = pathName || answers.pathName;
  const packageManagerType = packageManager || answers.yarnOrNpm || 'npm';

  await createDir(outputDir);
  // check if the root directory is empty
  const rootDir = path.resolve(outputDir);

  if (fs.readdirSync(rootDir).length !== 0) {
    return throwError(
      `The directory: '${rootDir}' is not empty. It is not recommended to install a prefab into an existing project.`
    );
  } else {
    // The directory is empty, so we can continue
    let module = {} as ModuleRegistry;
    const moduleType = detectPathType(prefabPath);

    if (moduleType === 'local') {
      module = await addLocalModule(prefabPath);
    }

    if (moduleType === 'remote') {
      module = await addRemoteModule(convertRegistryPathToUrl(prefabPath));
    }

    if (moduleType === 'custom') {
      module = await addRemoteModule(convertRegistryPathToUrl(prefabPath));
    }

    if (module?.name) {
      const prefabName = module.name;
      const version = module.version;
      const substitutions = module.substitute || [];
      const requiredFiles = [
        ...defaultRequiredFiles,
        ...(module.required_in_root || [])
      ];
      printMessage(`Installed ${prefabName}@${version}`, 'success');
      printMessage('Copying required files to application...', 'copying');

      // Initialise a promise
      const promises = [];

      const substitute = [
        ...substitutions,
        {
          replace: '%APP_ROOT%',
          with: outputDir
        }
      ];

      const prefabDir = `${buildaDir}/modules/prefabs/${prefabName}/files`;
      // Generate the correct files in the app directory
      writeFile({
        file: path.resolve(prefabDir, buildaDir, configFileName),
        output_dir: buildaDir,
        substitute,
        name
      });
      for (const file of requiredFiles) {
        promises.push(
          new Promise((resolve) => {
            const filePath = path.resolve(prefabDir, file);
            if (fs.existsSync(filePath)) {
              writeFile({
                file: path.resolve(prefabDir, filePath),
                output_dir: rootDir,
                substitute,
                name
              });
            }
            resolve(filePath);
          })
        );
      }
      printMessage('All files copied to application.', 'success');

      // Wait for all promises to resolve
      await Promise.all(promises);
      printMessage('Installing dependencies...', 'config');

      // Run package manager install

      if (fs.existsSync(path.resolve(rootDir, 'package.json'))) {
        printMessage(`Running ${packageManagerType} install`, 'processing');
        try {
          const childProcess = execa(packageManagerType, ['install'], {
            cwd: rootDir,
            all: true
          });
          childProcess?.all?.pipe(process.stdout);
          await childProcess;
          printMessage('All dependencies installed.', 'success');
        } catch (error) {
          printMessage('Failed to run. Please try running manually.', 'error');
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
