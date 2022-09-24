import fs from 'node:fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { printMessage, getSiteLink } from 'helpers';

import type { ConfigFile } from 'types/config-file';

import globals from 'data/globals';

import showHelp from './helpers/show-help';

import existingProjectQuestions from './helpers/existing-project-questions';
import newProjectQuestions from './helpers/new-project-questions';
import prefabQuestions from './helpers/prefab-questions';
import blueprintQuestions from './helpers/blueprint-questions';
import { TAnswers } from 'types/init-answers';

type TInit = {
  config?: ConfigFile;
};

// Starts a guided setup process to initialise a project
export default async ({ config }: TInit) => {
  const { buildaDir, configFileName } = globals;

  let answers: TAnswers = {
    projectName: '',
    appRoot: '',
    packageManager: ''
  };

  showHelp(
    'This is a guided setup process to initialise a project.\nIf you get stuck, visit ' +
      chalk.blue.underline(getSiteLink('docs/init')) +
      chalk.white(
        ' for more information.\nYou can exit the process at any time by pressing Ctrl+C.'
      )
  );

  if (config) {
    if (config.prefab) {
      showHelp(
        'This project was generated from a prefab and cannot be reinitialised.',
        'error'
      );
      process.exit(1);
    }
    showHelp(
      'It looks like builda has already been initialised in this project.\nYou can overwrite the existing config if you want to start again.\n' +
        chalk.yellow('Be careful though') +
        ', this will delete any existing config file and your' +
        buildaDir +
        ' directory.',
      'warning'
    );

    // If a config file already exists, ask the user if they want to overwrite it
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: chalk.red(`Are you sure you want to reset the builda config?`),
        default: false
      }
    ]);

    if (!overwrite) {
      // If the user doesn't want to overwrite the config file, exit the script
      printMessage('Process aborted at user request', 'notice');
      process.exit(0);
    }

    // If the user wants to overwrite the config file, delete the existing one
    fs.unlinkSync(configFileName);
    // And delete the builda directory
    if (fs.existsSync(buildaDir)) {
      fs.rmdirSync(buildaDir, { recursive: true });
    }
  }

  const { projectType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'projectType',
      message:
        'Is this a new project or are you adding Builda to an existing project?',
      choices: [
        {
          name: 'New project',
          value: 'new'
        },
        {
          name: 'Existing project',
          value: 'existing'
        }
      ]
    }
  ]);

  if (projectType === 'new') {
    showHelp(
      "A fresh start! Let's get you set up with a new project.\n\n" +
        'You can choose to use a prefab to get started quickly, or you can set up a project from scratch.'
    );

    const prefabAnswers = await prefabQuestions(answers);

    if (prefabAnswers.usePrefab) {
      answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
    } else {
      showHelp(
        'You can set up a project from scratch by answering a few questions about your project.\n' +
          `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`
      );
    }
    const newProjectAnswers = await newProjectQuestions();
    answers = { ...answers, ...newProjectAnswers };
  } else {
    showHelp(
      'You can add builda to an existing project by answering a few questions about your project.\n' +
        `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`
    );
    const existingProjectAnswers = await existingProjectQuestions();
    answers = { ...answers, ...existingProjectAnswers };
  }

  const blueprintAnswers = await blueprintQuestions(answers);

  answers = { ...answers, ...blueprintAnswers };

  console.log(answers);
};
