import fs from 'node:fs';
import inquirer from 'inquirer';
import chalk from 'chalk';

import { showHelp } from 'helpers';

export default async () => {
  const packageJson = () => {
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      return packageJson;
    } catch (error) {
      return '';
    }
  };

  const { name } = packageJson();

  // Find out if the project is a monorepo
  const checkForMonorepo = () => {
    if (fs.existsSync('lerna.json')) {
      return true;
    }
    if (packageJson().workspaces) {
      return true;
    }
    return false;
  };

  const isMonorepo = checkForMonorepo();

  const determinePackageManager = () => {
    if (fs.existsSync('yarn.lock')) {
      return 'yarn';
    }
    if (fs.existsSync('package-lock.json')) {
      return 'npm';
    }
    return 'unknown';
  };

  const packageManager = determinePackageManager();

  return inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: `We think your project is called ${chalk.bold.magenta(
        name
      )}. Press enter if correct? If not, enter the correct name here.`,
      default: name
    },
    {
      type: 'input',
      name: 'appRoot',
      message: () => {
        showHelp(
          "The app root is the directory where your app files are stored.\n\nThis is usually your current working directory but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\n\nIf you're not sure, just press enter to use the current working directory."
        );
        return `We think your app root ${
          !isMonorepo
            ? 'is ./'
            : 'may be in a monorepo, please enter the package name. If it is not a monorepo, just press enter to use ./ or specify the directory your app is store in'
        }`;
      },
      default: './'
    },
    {
      type: 'list',
      name: 'packageManager',
      message: () => {
        showHelp(
          'Builda works with both npm and yarn. If you are using a different package manager, unfortunately, Builda may not work for you.'
        );
        return (
          'We think you are using ' +
          chalk.bold.magenta(packageManager) +
          '. Press enter if correct? If not, select the correct package manager.'
        );
      },
      choices: ['npm', 'yarn'],
      default: packageManager
    }
  ]);
};
