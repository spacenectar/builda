import fs from 'node:fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { printMessage } from 'helpers';

import type { ConfigFile } from 'types/config-file';

import globals from 'data/globals';

import showHelp from './helpers/show-help';

import existingProjectQuestions from './helpers/existing-project-questions';
import newProjectQuestions from './helpers/new-project-questions';

type TInit = {
  config?: ConfigFile;
};

// Starts a guided setup process to initialise a project
export default async ({ config }: TInit) => {
  const { buildaDir, configFileName, websiteUrl } = globals;

  showHelp(
    'This is a guided setup process to initialise a project.\nIf you get stuck, visit ' +
      chalk.blue.underline(`http://${websiteUrl}/docs/initialise-a-project`) +
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
        'You can choose to use a prefab to get started quickly, or you can set up a project from scratch.\n' +
        "If you don't have a prefab in mind or if you are unsure what a prefab is, take a look at " +
        chalk.blue.underline(`http://${websiteUrl}/docs/prefabs`) +
        '.'
    );

    // If the project is new, ask the user if they want to use a prefab
    const { usePrefab } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'usePrefab',
        message: 'Do you want to set the project up using a prefab?\n ',
        default: true
      }
    ]);

    if (usePrefab) {
      const { prefabChoice } = await inquirer.prompt([
        {
          type: 'list',
          name: 'prefabChoice',
          message:
            'Do you have a prefab url or do you want to choose from a list?',
          choices: [
            {
              name: 'I have a prefab url',
              value: 'url'
            },
            {
              name: 'I want to choose from a list',
              value: 'list'
            }
          ]
        }
      ]);

      let prefab = '';

      if (prefabChoice === 'url') {
        showHelp(
          'The url should point to the folder that the prefabs registry.json file is in.\nIt can be a regular link or use a resolver\n.' +
            chalk.blue.underline(`http://${websiteUrl}/docs/resolvers`)
        );
        const { prefabUrl } = await inquirer.prompt([
          {
            type: 'input',
            name: 'prefabUrl',
            message: 'Enter the prefab url:'
          }
        ]);
        prefab = prefabUrl;
      }

      if (prefabChoice === 'list') {
        showHelp(
          'This list is not exhaustive. You can find more prefabs at ' +
            chalk.blue.underline(`http://${websiteUrl}/trade-store`)
        );
        const { prefabList } = await inquirer.prompt([
          {
            type: 'list',
            name: 'prefabList',
            message: 'Choose a prefab:',
            choices: [
              {
                name: 'Fake prefab 1',
                value: ''
              },
              {
                name: 'Fake prefab 2',
                value: ''
              },
              {
                name: 'Fake prefab 3',
                value: ''
              }
            ]
          }
        ]);
        prefab = prefabList;
      }

      console.log(prefab);
    } else {
      showHelp(
        'You can set up a project from scratch by answering a few questions about your project.\n' +
          'If you are unsure about any of these, you can always change them later by editing the builda.json file.'
      );
    }
    const { projectName, appRoot, packageManager } =
      await newProjectQuestions();
    console.log(projectName, appRoot, packageManager);
  } else {
    showHelp(
      'You can add builda to an existing project by answering a few questions about your project.\n' +
        'If you are unsure about any of these, you can always change them later by editing the builda.json file.'
    );
    const { projectName, appRoot, packageManager } =
      await existingProjectQuestions();
    console.log(projectName, appRoot, packageManager);
  }
};
