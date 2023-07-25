import execa from 'execa';
import inquirer from 'inquirer';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

import globals from 'data/globals';
import {
  createDir,
  printMessage,
  printLogo,
  throwError,
  changeCase,
  newProjectQuestions,
  prefabQuestions,
  showHelp
} from 'helpers';
import { generateFromPrefab } from './helpers/generate-from-prefab';

export type TGenerateProject = {
  appName?: string;
  prefab?: string;
  cliPrefabPath?: string;
  smokeTest?: boolean;
};

/**
 * Generate a new project from a prefab
 * @param { TGenerateProject }
 */
export default async ({ appName, prefab, smokeTest }: TGenerateProject) => {
  const { buildaDir, websiteUrl, buildaReadmeFileName } = globals;

  const defaultRequiredFiles = ['README.md'];

  printLogo();

  let answers = {} as TFlatObject;
  if (!prefab) {
    const { usePrefab } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usePrefab',
        message: `Do you want to set the project up using a prefab?`,
        default: true
      }
    ]);

    if (usePrefab) {
      const prefabAnswers = await prefabQuestions();
      answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
    } else {
      showHelp(
        'You can set up a project from scratch by answering a few questions about your project.\r\n\n' +
          `If you are unsure about any of these, you can always change them later by editing the 'builda' section of your package.json file.`
      );
    }

    if (answers.prefab) {
      showHelp(
        'Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.',
        'success'
      );
    }
  }

  let newProjectAnswers = {} as TFlatObject;

  if (!prefab || !appName) {
    newProjectAnswers = await newProjectQuestions();
  }
  answers = { ...answers, ...newProjectAnswers };
  const name = (appName || answers.appName) as string;
  const prefabPath = (prefab || answers.prefab) as string;

  const kebabAppName = changeCase(name, 'kebabCase');
  const rootDir = path.join(process.cwd(), kebabAppName);

  await createDir(kebabAppName);

  // Change directory to the new app
  process.chdir(kebabAppName);

  // check if the root directory is empty
  const workingDir = path.join(rootDir, buildaDir, 'export');
  const prefabDir = path.join(rootDir, buildaDir, 'modules', 'prefab');

  if (fs.readdirSync(rootDir).length !== 0) {
    throwError(
      `The directory: '${kebabAppName}' already exists. It is not recommended to install a prefab into an existing project.`
    );
  }

  await createDir(workingDir);

  // The directory is empty, so we can continue
  const module = {} as ModuleRegistry;
  // If the user isn't using a prefab, we can just create a config and then skip the rest of this file

  if (prefabPath) {
    await generateFromPrefab(
      prefabPath,
      module,
      rootDir,
      defaultRequiredFiles,
      prefabDir,
      workingDir,
      name,
      buildaDir,
      websiteUrl,
      buildaReadmeFileName
    );
  }

  printMessage(`Your application, "${name}" has been initialised!`, 'success');
  if (smokeTest) {
    process.chdir('../');
    fs.rm(name, { recursive: true, force: true }, (err) => {
      if (err) {
        console.log(err);
      }
      printMessage(`This was a smoke test. No files were created.`, 'primary');
    });
  } else {
    execa('cd', [name]); // TODO: This doesn't work
    printMessage(
      `For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`,
      'primary'
    );
  }
};
