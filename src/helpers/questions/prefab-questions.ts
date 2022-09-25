import inquirer from 'inquirer';
import chalk from 'chalk';

import {
  getSiteLink,
  printSiteLink,
  showHelp,
  validateModulePath
} from 'helpers';

import { TAnswers } from 'types/init-answers';

import suggestedPrefabs from 'data/suggested-prefabs.json';

export default async (answers: TAnswers) => {
  showHelp(
    "These questions are all about building a project from a prefab.\n\nIf you're not sure what a prefab is, visit " +
      chalk.blue.underline(getSiteLink('docs/prefabs')) +
      chalk.white(' for more information.')
  );
  return inquirer.prompt([
    {
      type: 'list',
      name: 'prefabChoice',
      message: 'Do you have a prefab url or do you want to choose from a list?',
      choices: [
        {
          name: 'I have a url',
          value: 'url'
        },
        {
          name: 'I want to choose from a list',
          value: 'list'
        }
      ]
    },
    {
      type: 'input',
      name: 'prefabUrl',
      message: () => {
        showHelp(
          'The url should point to the folder that the prefabs registry.json file is in. It can be a regular link or use a resolver.' +
            printSiteLink({ link: 'docs/resolvers' })
        );
        return 'Enter the prefab url:';
      },
      when: (answers) => answers.prefabChoice === 'url',
      validate: async (input) => {
        if (!input) {
          return 'You must enter a url';
        }
        // Check that a registry.json file exists at the url
        return validateModulePath(input, answers);
      }
    },
    {
      type: 'list',
      name: 'prefabList',
      message: () => {
        showHelp(
          'This list is not exhaustive. You can find more prefabs at ' +
            chalk.blue.underline(getSiteLink('tradeStore/prefabs'))
        );
        return 'Choose a prefab:';
      },
      choices: suggestedPrefabs,
      when: (answers) => answers.prefabChoice === 'list'
    }
  ]);
};
