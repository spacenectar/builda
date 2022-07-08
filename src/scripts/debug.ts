#! /usr/bin/env node

/**
 * This file is for debugging purposes.
 */

import yargs from 'yargs';
import fs from 'fs';

import init from '@scripts/init';
import presetAnswers from '@mocks/preset-answers';
import arguments from '@data/arguments.json';
import printMessage from '@helpers/print-message';

const args = process.argv.slice(2);

const options = {
  ...arguments,
  clear: {
    description: 'Deletes generated files',
    required: false,
    boolean: true
  }
};

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(options as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help')
  .command('<name..>', 'Create a new component');

(async () => {
  const argv = await parser.argv;

  if (argv.init) {
    return init({ presetAnswers });
  }

  if (argv.clear) {
    if (fs.existsSync('.builda.yml')) {
      fs.rmSync('.builda.yml');
      return printMessage('.builda.yml file has been deleted', 'success');
    }
    return printMessage('No .builda.yml file found', 'danger');
  }

  printMessage('That debug command is not yet implemented.', 'danger');
})();
