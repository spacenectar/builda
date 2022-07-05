#! /usr/bin/env node

import yargs from 'yargs';

// import helpers
import { printMessage, askQuestion, getConfigFile, printLogo } from '@helpers';

// import data
import arguments from '@data/arguments.json';

// import type definitions
import { QuestionType } from '@typedefs/question-type';

// import scripts
import init from '@scripts/init';

const args = process.argv.slice(2);
const config = getConfigFile();

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(arguments as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help')
  .command('<name..>', 'Create a new component');

printLogo();

const OVERWRITE_CONFIG_QUESTION = {
  message: 'Do you really want to replace your .builda.yml file?',
  name: 'replaceConfig',
  type: 'confirm' as QuestionType
};

const CREATE_CONFIG_QUESTION = {
  message: 'Would you like to create a .builda.yml file?',
  name: 'createConfig',
  type: 'confirm' as QuestionType
};

(async () => {
  const argv = await parser.argv;

  if (args.length === 0 && config) {
    // No arguments were passed but a config file exists
    printMessage('🛠 This route does not exist yet.\r', 'notice');
  }

  if (args.length === 0 && !config) {
    // No arguments were passed but a config file does not exist
    printMessage(
      'No arguments were passed and no .builda.yml was found.\r',
      'warning'
    );
    return askQuestion(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
      createConfig
        ? init()
        : printMessage('Process terminated due to user selection', 'error');
      process.exit(1);
    });
  }

  if (argv.init) {
    if (config) {
      printMessage('.builda.yml file detected.\r', 'warning');
      return askQuestion(OVERWRITE_CONFIG_QUESTION).then(
        ({ replaceConfig }) => {
          replaceConfig
            ? printMessage('Replaced config in project root', 'success')
            : printMessage('Process terminated due to user selection', 'error');
          process.exit(0);
        }
      );
    }
    printMessage(
      'No .builda.yml file detected. Starting initialisation...\r',
      'notice'
    );
    init();
  }

  if (argv.migrate) {
    // The user wants to migrate an old buildcom config file
    // Go to migrate function
    return printMessage('🛠 This route does not exist yet.\r', 'notice');
  }
})();
