import inquirer from 'inquirer';
import chalk from 'chalk';

import { randomWordGenerator } from 'helpers';

import showHelp from './show-help';

export default async () => {
  const suggestedName = randomWordGenerator();
  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      required: true,
      message: `What do you want to call your project? (If you don't know, just press enter to use ${chalk.bold.magenta(
        suggestedName
      )})`,
      default: suggestedName
    },
    {
      type: 'input',
      name: 'appRoot',
      message: () => {
        showHelp(
          "The app root is the directory where your app files are stored.\nThis is usually your current working directory but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\nIf you're not sure, just press enter to use the current working directory."
        );
        return 'What is the root directory of your app?';
      },
      default: './'
    },
    {
      type: 'list',
      name: 'packageManager',
      message: () => {
        showHelp(
          'Builda works with both npm and yarn. If you are not sure, just press enter to use npm.'
        );
        return 'Which package manager do you want to use?';
      },
      choices: ['npm', 'yarn'],
      default: 'npm'
    }
  ]);
};
