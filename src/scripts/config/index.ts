import yargs from 'yargs';

import {
  printMessage,
  askQuestion,
  directoryRegex,
  randomWordGenerator
} from '@helpers';
import arguments from '@data/arguments.json';
import { QuestionType } from '@typedefs/question-type';

import getConfigFile from './config-file-mode';
import getConfigFromArguments from './get-config-from-arguments';

const args = process.argv.slice(2);
const config = getConfigFile();

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(arguments as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help')
  .command('<name..>', 'Create a new component');

const NAME_COMPONENT_QUESTION = {
  message: 'What would you like to name your component?',
  name: 'componentName',
  defaultValue: randomWordGenerator(),
  validate: (value: string) =>
    directoryRegex.test(value) ? true : 'Component name is invalid'
};

const CREATE_CONFIG_QUESTION = {
  message: 'Would you like to create a .buildcomrc file?',
  name: 'createConfig',
  type: 'confirm' as QuestionType
};

export default async () => {
  const argv = await parser.argv;

  if (args.length === 0 && config) {
    // No arguments were passed but a config file exists
    printMessage('🚀 .buildcomrc file detected.\r', 'success');
    // Ask user what they want to call their component
    return askQuestion(NAME_COMPONENT_QUESTION).then(({ componentName }) => {
      return {
        component_names: [componentName],
        ...config
      };
    });
  }

  if (args.length === 0 && !config) {
    // No arguments were passed but a config file does not exist
    printMessage(
      'No arguments were passed and no .builda.yml was found.\r',
      'warning'
    );
    return askQuestion(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
      createConfig
        ? console.log('created file') // TODO: Add init function
        : printMessage('Process terminated due to user selection', 'error');
      process.exit(1);
    });
  }

  if (argv.init) {
    // The user wants to create a config file
    // Go to init function
    console.log('init mode');
    return;
  }

  if (argv.migrate) {
    // The user wants to migrate an old buildcom config file
    // Go to migrate function
    console.log('migrate mode');
    return;
  }

  // Arguments were passed
  return getConfigFromArguments(argv);
};
