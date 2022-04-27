// import fs from 'fs';
// import path from 'path';
import { printMessage, askQuestion } from '@helpers';

import getConfigFile from './configFileMode';

const args = process.argv.slice(2);
const config = getConfigFile();

export default async () => {
  if (args.length === 0) {
    // No arguments were passed
    if (config) {
      // The config file exists
      printMessage('🚀 .buildcomrc file detected.\r', 'success');
      // Ask user what they want to call their component
      askQuestion({
        message: 'What would you like to name your component?',
        name: 'componentName'
      }).then(({ componentName }) => {
        // TODO: We have a complete component config now, send user to the generator function
        console.log('created componenent called ', componentName);
      });
    } else {
      // The config file does not exist
      printMessage(
        'No arguments were passed and no .buildcomrc file was found.\r',
        'warning'
      );
      askQuestion({
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
    // TODO: Send user to argument function
    printMessage('Arguments were passed', 'success');
  }
};
