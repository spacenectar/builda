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
    }
  ]);
};
