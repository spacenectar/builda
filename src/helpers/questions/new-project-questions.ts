import inquirer from 'inquirer';
import chalk from 'chalk';

import { randomNameGenerator, showHelp } from 'helpers';

export default async (hasPrefab?: boolean) => {
  const suggestedName = randomNameGenerator();

  if (hasPrefab) {
    showHelp(
      'Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.',
      'success'
    );
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'appName',
      required: true,
      message: `What do you want to call your project? This will also be the folder name we will create for your app. (If you don't know, just press enter to use ${chalk.bold.magenta(
        suggestedName
      )})`,
      default: suggestedName
    },
    {
      type: 'input',
      name: 'appRoot',
      message: () => {
        showHelp(
          "The app root is the directory where your app files are stored.\n\nThis is usually your the root directory of your app but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\n\nIf you're not sure, just press enter to use the current working directory."
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
