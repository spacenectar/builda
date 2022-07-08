#! /usr/bin/env node

/**
 * This file is for debugging purposes.
 */

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

import init from '@scripts/init';
import presetAnswers from '@mocks/preset-answers';
import arguments from '@data/arguments.json';
import printMessage from '@helpers/print-message';

const args = hideBin(process.argv);

const options = {
  ...arguments,
  clear: {
    description: 'Deletes generated files',
    required: false,
    boolean: true,
    alias: 'c'
  },
  force: {
    description: 'Overwrites existing files',
    required: false,
    boolean: true,
    alias: 'f'
  }
};

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(options as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help')
  .command('<name..>', 'Create a new component');

export const debug = async ({
  runInit = false,
  runClear = false,
  runPurge = false,
  force = false
}) => {
  const argv = await parser.argv;

  if (argv.force) {
    force = true;
  }

  if (argv.init || runInit) {
    return init({ presetAnswers, force });
  }

  if (argv.clear || runClear) {
    if (fs.existsSync('./experiments')) {
      fs.rmdirSync('experiments', { recursive: true });
      printMessage('experiments folder has been deleted', 'success');
    }
    return process.exit(0);
  }

  if (argv.purge || runPurge) {
    if (fs.existsSync('.builda.yml')) {
      fs.rmSync('.builda.yml');
      printMessage('.builda.yml file has been deleted', 'success');
    }
    return process.exit(0);
  }

  if (args.length)
    printMessage('That debug command is not yet implemented.', 'danger');
};

export default debug;

if (args.length) debug({});
