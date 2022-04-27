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

export default async () => {
  const parser = yargs(args)
    .usage('Usage: $0 [options]')
    .options(arguments as { [key: string]: yargs.Options })
    .help('h')
    .version()
    .alias('h', 'help')
    .command('<name..>', 'Create a new component');

  const argv = await parser.argv;

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

  if (args.length === 0) {
    // No arguments were passed
    if (config) {
      // The config file exists
      printMessage('🚀 .buildcomrc file detected.\r', 'success');
      // Ask user what they want to call their component
      return askQuestion(NAME_COMPONENT_QUESTION).then(({ componentName }) => {
        return {
          component_names: [componentName],
          ...config
        };
      });
    } else {
      // The config file does not exist
      printMessage(
        'No arguments were passed and no .buildcomrc file was found.\r',
        'warning'
      );
      return askQuestion(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
        createConfig
          ? console.log('created file') // TODO: Send user to init function
          : printMessage('Process terminated due to user selection', 'error');
        process.exit(1);
      });
    }
  } else {
    printMessage('Arguments were passed', 'success');
    return getConfigFromArguments(argv);
  }
};
