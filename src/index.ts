#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// import helpers
import { printMessage, askQuestion, getConfigFile, printLogo } from '@helpers';

// import data
import arguments from '@data/arguments.json';

// import type definitions
import { QuestionType } from '@typedefs/question-type';

// import scripts
import init from '@scripts/init';
import generateCommands from '@scripts/generate-commands';
import buildFromScaffold from '@scripts/build-from-scaffold';
import addModule from '@scripts/add-module';

const args = hideBin(process.argv);
const config = getConfigFile();

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(arguments as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help');

printLogo();

const CREATE_CONFIG_QUESTION = {
  message: 'Would you like to create a .builda config?',
  name: 'createConfig',
  type: 'confirm' as QuestionType
};

(async () => {
  const argv = await parser.argv;

  if (args.length === 0 && config) {
    // No arguments were passed but a config file exists
    printMessage('No arguments provided.\r', 'danger');
    parser.showHelp();
  }

  if ((args.length === 0 || !argv.manual) && !config) {
    printMessage('Builda config not detected.\r', 'danger');
    // No arguments were passed but a config file does not exist
    return askQuestion(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
      if (createConfig) {
        return init({});
      }
      printMessage('Process terminated due to user selection', 'error');
      return process.exit(1);
    });
  }

  if (argv.init) init({});

  if (argv.manual) {
    printMessage('Manual mode selected.\r', 'notice');
    return printMessage('🛠 This route does not exist yet.\r', 'notice');
  }

  if (argv._[0].toString() === 'add') {
    const module = argv._[1].toString();
    return addModule(module);
  }

  if (argv.migrate) {
    // The user wants to migrate an old buildcom config file
    // Go to migrate function
    return printMessage('🛠 This route does not exist yet.\r', 'notice');
  }

  const commands = config ? generateCommands() : [];

  const commandString = process.argv[2].replace('--', '');

  const command = commands.find((c) => c.name === commandString);

  if (command) {
    const name = argv._[1].toString();

    const prefix = argv.prefix ? (argv.prefix as string) : '';

    if (prefix) {
      const allowedPrefixes = command.substitute.prefix;
      if (!allowedPrefixes.includes(prefix)) {
        return printMessage(`Prefix ${prefix} is not allowed.`, 'error');
      }
    }

    return buildFromScaffold({
      name,
      command: command.name,
      substitute: prefix
    });
  } else {
    return printMessage(
      `'${command}' is not a recognised command.\r`,
      'danger'
    );
  }
})();
