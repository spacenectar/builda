import fs from 'node:fs';
import EventEmitter from 'node:events';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { printMessage, printSiteLink, showHelp } from 'helpers';

import type { ConfigFile } from 'types/config-file';

import globals from 'data/globals';

import existingProjectQuestions from 'helpers/questions/existing-project-questions';
import newProjectQuestions from 'helpers/questions/new-project-questions';
import prefabQuestions from 'helpers/questions/prefab-questions';
import blueprintQuestions from 'helpers/questions/blueprint-questions';

import { TFlatObject } from 'types/flat-object';

type TInit = {
  config?: ConfigFile;
};

// Starts a guided setup process to initialise a project
export default async ({ config }: TInit) => {
  // WORKAROUND: This is a workaround for a bug in inquirer that causes the
  // event listeners to not be removed until the process exits
  // This number should be incremented if the number of questions exceeds 50
  EventEmitter.defaultMaxListeners = 50;

  const { buildaDir, configFileName } = globals;

  let answers: TFlatObject = {
    projectName: '',
    appRoot: '',
    packageManager: ''
  };

  if (config) {
    if (config.prefab) {
      showHelp(
        'This project was generated from a prefab and cannot be reinitialised. If you meant to run "builda install" instead, press Y to continue, or the "N" or "enter" key to exit.',
        'error'
      );

      const { installInstead } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'installInstead',
          message: 'Run install instead?',
          default: false
        }
      ]);

      if (installInstead) {
        return console.log('Running install instead...');
      }

      process.exit(1);
    }
    showHelp(
      'It looks like builda has already been initialised in this project.\nYou can overwrite the existing config if you want to start again.\r\n\n' +
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

  showHelp(
    'Welcome to ' +
      chalk.magenta('Builda') +
      ' This is a guided setup process help you get your project up and running.' +
      printSiteLink({
        link: 'docs/init',
        endText: 'if you get stuck.\n\n'
      }) +
      chalk.white('You can exit the process at any time by pressing Ctrl+C.'),
    'builda'
  );

  // Ask the user what they want to do
  const { initType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'initType',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'I want to start a new project',
          value: 'new'
        },
        {
          name: 'I want to use blueprints in an existing project',
          value: 'existing'
        },
        {
          name: 'I want to create my own prefab',
          value: 'prefab'
        },
        {
          name: 'I want to create my own blueprint',
          value: 'blueprint'
        }
      ]
    }
  ]);

  if (initType === 'new') {
    showHelp(
      "A fresh start! Let's get you set up with a new project.\r\n\nYou can choose to use a prefab to get started quickly, or you can set up a project from scratch."
    );

    const { usePrefab } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usePrefab',
        message: `Do you want to set the project up using a prefab?`,
        default: true
      }
    ]);

    if (usePrefab) {
      const prefabAnswers = await prefabQuestions(answers);
      answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
    } else {
      showHelp(
        'You can set up a project from scratch by answering a few questions about your project.\r\n\n' +
          `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`
      );
    }

    if (answers.prefab) {
      showHelp(
        'Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.',
        'success'
      );
    }

    const newProjectAnswers = await newProjectQuestions();
    answers = { ...answers, ...newProjectAnswers };
  }

  if (initType === 'existing') {
    showHelp(
      'You can add builda to an existing project by answering a few questions about your project.\r\n\n' +
        `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`
    );
    const existingProjectAnswers = await existingProjectQuestions();
    answers = { ...answers, ...existingProjectAnswers };
  }

  if (initType === 'new' || initType === 'existing') {
    const blueprintAnswers = await blueprintQuestions(answers);
    answers = { ...answers, ...blueprintAnswers };
  }

  if (initType === 'prefab') {
    showHelp(
      'You can create your own prefab by answering a few questions about your project.\r\n\n' +
        `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.` +
        printSiteLink({ link: 'docs/build-a-module', anchor: 'prefab' })
    );
  }

  if (initType === 'blueprint') {
    showHelp(
      'You can create your own blueprint by answering a few questions about your project.\r\n\n' +
        `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.\r\n\n` +
        printSiteLink({ link: 'docs/build-a-module', anchor: 'blueprint' })
    );
  }

  console.log(answers);
};
