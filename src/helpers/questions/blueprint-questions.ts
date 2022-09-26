import inquirer from 'inquirer';
import chalk from 'chalk';

import {
  getSiteLink,
  printSiteLink,
  validateModulePath,
  showHelp
} from 'helpers';

import { TFlatObject } from 'types/flat-object';

import suggestedBlueprints from 'data/suggested-blueprints.json';

const validateBlueprint = async (input: string, answers: TFlatObject) => {
  const moduleValid = await validateModulePath(input, answers);

  if (moduleValid === true) {
    if (answers.prefabRegistry) {
      const registry = answers.prefabRegistry as TFlatObject;
      const blueprints = registry.blueprints as TFlatObject;
      if (blueprints && blueprints[input]) {
        return 'A blueprint with that name already exists';
      }
      return moduleValid;
    }
  }
  return moduleValid;
};

export default async (answers: TFlatObject) => {
  showHelp(
    "These questions are all about adding blueprints to your project.\r\n\nIf you're not sure what a blueprint is" +
      printSiteLink({ link: 'docs/blueprints' })
  );
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'addBlueprints',
      message: () => {
        let blueprintList = [];
        const registry = answers.prefabRegistry as TFlatObject;
        const blueprints = registry?.blueprints as TFlatObject;
        if (answers.prefab && !!blueprints) {
          blueprintList = Object.keys(blueprints);
          showHelp(
            `You are generating this project from the ${chalk.blue(
              registry.name
            )} prefab.\n\nIt comes with the following blueprints:\n\n\t` +
              blueprintList
                .map((blueprint) => chalk.blue(blueprint))
                .join('\n\t') +
              '\n\nEnsure that any additional blueprints you add are compatible with this prefab.',
            'warning'
          );
        }
        return `Do you want to add any${
          blueprintList.length ? 'additional' : ''
        } blueprints to your project?`;
      },
      default: true
    },
    {
      type: 'list',
      name: 'blueprintChoice',
      message:
        'Do you have url(s) for your blueprint(s) or do you want to choose from a list?',
      choices: [
        {
          name: 'I have url(s)',
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
      name: 'blueprintUrls',
      message:
        'Enter the blueprint url(s) (if adding more than one, please separate them with a space):',
      when: (answers) => answers.blueprintChoice === 'url',
      validate: async (input) => {
        if (!input) {
          return 'You must enter at least one url';
        }
        const urls = input.split(' ');
        for (const url of urls) {
          // Check that the blueprints are valid and don't already exist
          const moduleValid = await validateBlueprint(url, answers);
          if (moduleValid !== true) {
            return `The module at ${url} returned an error: ${moduleValid}`;
          }
        }
        return true;
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
        return 'Choose your blueprints:';
      },
      choices: suggestedBlueprints,
      when: (answers) => answers.blueprintChoice === 'list',
      validate: async (input) => {
        if (!input.length) {
          return 'You must choose at least one blueprint';
        }
        // Check that the blueprint is valid and doesn't already exist
        for (const blueprint of input) {
          const moduleValid = await validateBlueprint(blueprint, answers);
          if (moduleValid !== true) {
            return `The module at ${blueprint} returned an error: ${moduleValid}`;
          }
        }
        return true;
      }
    }
  ]);
};
