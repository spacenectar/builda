import { printMessage, askQuestion } from '@helpers';

import getConfigFile from './config-file-mode';
import getConfigFromArguments from './get-config-from-arguments';

const args = process.argv.slice(2);
const config = getConfigFile();

export default async () => {
  if (args.length === 0) {
    // No arguments were passed
    if (config) {
      // The config file exists
      printMessage('🚀 .buildcomrc file detected.\r', 'success');
      // Ask user what they want to call their component
      return askQuestion({
        message: 'What would you like to name your component?',
        name: 'componentName'
      }).then(({ componentName }) => {
        return {
          component_name: componentName,
          ...config
        };
      });
    } else {
      // The config file does not exist
      printMessage(
        'No arguments were passed and no .buildcomrc file was found.\r',
        'warning'
      );
      return askQuestion({
        message: 'Would you like to create a .buildcomrc file?',
        name: 'createConfig',
        type: 'confirm'
      }).then(({ createConfig }) => {
        createConfig
          ? console.log('created file') // TODO: Send user to init function
          : printMessage('Process terminated due to user selection', 'error');
        process.exit(1);
      });
    }
  } else {
    printMessage('Arguments were passed', 'success');
    return getConfigFromArguments(args);
  }
};
