#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// import helpers
import {
  printMessage,
  askQuestion,
  getConfigFile,
  printLogo,
  getSubstitutions
} from '@helpers';

// import data
import arguments from '@data/arguments.json';
import globals from '@data/globals';

// import type definitions
import type { QuestionType } from '@typedefs/question-type';

// import scripts
import init from '@scripts/init';
import generateCommands from '@scripts/generate-commands';
import buildFromScaffold from '@scripts/build-from-scaffold';
import addModule from '@scripts/add-module';

const args = hideBin(process.argv);
const config = getConfigFile();

const { configFileName, websiteUrl } = globals;

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(arguments as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help')
  .epilogue(`For more information, visit ${websiteUrl}`);

printLogo();

const CREATE_CONFIG_QUESTION = {
  message: `Would you like to create a ${configFileName} config?`,
  name: 'createConfig',
  type: 'confirm' as QuestionType
};

(async () => {
  const argv = await parser.argv;

  /** UNHAPPY PATHS */

  if (config) {
    if (args.length === 0) {
      // No arguments were passed but a config file exists
      printMessage('No arguments provided.\r', 'danger');
      parser.showHelp();
      return process.exit(0);
    }

    if (argv.init) {
      printMessage(`A ${configFileName} has been found. Please delete it before continuing.\r`, 'danger');
      return process.exit(0);
    }
  }

  if ((args.length === 0 || !argv.manual) && !config) {
    printMessage(`No ${configFileName} found. Please run the 'init' command.\r`, 'danger');
    // No arguments were passed but a config file does not exist
    return askQuestion(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
      if (createConfig) {
        return init({});
      }
      printMessage('Process terminated due to user selection', 'error');
      return process.exit(0);
    });
  }

  if (argv.manual) {
    printMessage('Manual mode selected.\r', 'notice');
    printMessage('🛠 This route does not exist yet.\r', 'notice');
    return process.exit(0);
  }

  if (argv.migrate) {
    // The user wants to migrate an old buildcom config file
    // Go to migrate function
    return printMessage('🛠 This route does not exist yet.\r', 'notice');
  }


  /** HAPPY PATHS */
  if (argv.init) return init({});

  if (argv._[0].toString() === 'add') {
    const module = argv._[1].toString();
    return addModule({path: module});
  }

  const commands = config ? generateCommands() : [];

  const commandString = process.argv[2].replace('--', '');

  const command = commands.find((c) => c.name === commandString);

  const substitute = command ? getSubstitutions(command, argv) : [];

  if (command) {
    const name = argv._[1].toString();

    return buildFromScaffold({
      name,
      command: command.name,
      substitute
    });
  } else {
    return printMessage(
      `'${command}' is not a recognised command.\r`,
      'danger'
    );
  }
})();
