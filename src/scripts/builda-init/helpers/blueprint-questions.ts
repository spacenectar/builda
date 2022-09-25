import inquirer from 'inquirer';
import chalk from 'chalk';

import { getSiteLink, printSiteLink, validateModulePath } from 'helpers';

import showHelp from './show-help';
import { TAnswers } from 'types/init-answers';

const validateBlueprint = async (input: string, answers: TAnswers) => {
  const moduleValid = await validateModulePath(input, answers);

  if (moduleValid === true) {
    if (answers.prefabRegistry) {
      const { blueprints } = answers.prefabRegistry;
      if (blueprints && blueprints[input]) {
        return 'A blueprint with that name already exists';
      }
      return true;
    }
    return 'No prefab registry found - this was an unexpected error';
  }
  return moduleValid;
};

export default async (answers: TAnswers) => {
  showHelp(
    "This section is all about adding blueprints to your project.\r\n\nIf you're not sure what a blueprint is" +
      printSiteLink({ link: 'docs/blueprints' })
  );
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'addBlueprints',
      message: () => {
        let blueprintList = [];
        if (answers.prefab && !!answers.prefabRegistry?.blueprints) {
          blueprintList = Object.keys(answers.prefabRegistry.blueprints);
          showHelp(
            `You are generating this project from the ${chalk.blue(
              answers.prefabRegistry?.name
            )} prefab.\n\nIt comes with the following blueprints:\n\n\t` +
              blueprintList
                .map((blueprint) => chalk.blue(blueprint))
                .join('\n\t') +
              '\n\nEnsure that any additional blueprints you add are compatible with this prefab.',
            'warning'
          );
        }
        return `Do you want to add any ${
          blueprintList.length ? 'additional' : ''
        } blueprints to your project?`;
      },
      default: true
    },
    {
      type: 'list',
      name: 'blueprintChoice',
      message:
        'Do you have urls for your blueprint(s) or do you want to choose from a list?',
      choices: [
        {
          name: 'I have urls',
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
      name: 'blueprintUrl',
      message: 'Enter the blueprint url:',
      when: (answers) => answers.blueprintChoice === 'url',
      validate: async (input) => {
        // Check that the blueprint is valid and doesn't already exist
        return validateBlueprint(input, answers);
      }
    },
    {
      type: 'checkbox',
      name: 'blueprintList',
      message: () => {
        showHelp(
          'This list is not exhaustive. You can find more blueprints at ' +
            chalk.blue.underline(getSiteLink('tradeStore/blueprints'))
        );
        return 'Choose a blueprint:';
      },
      choices: [
        {
          name: 'Fake blueprint',
          value: ''
        },
        {
          name: 'Another fake blueprint',
          value: ''
        },
        {
          name: 'Yet another fake blueprint',
          value: ''
        }
      ],
      when: (answers) => answers.blueprintChoice === 'list',
      validate: (input) => {
        // Check that the blueprint is valid and doesn't already exist
        return validateBlueprint(input, answers);
      }
    }
  ]);
};
