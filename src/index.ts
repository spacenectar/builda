#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// import helpers
import { printMessage, askQuestion, getConfigFile, printLogo } from '@helpers';

// import data
import arguments from '@data/arguments.json';
import globals from '@data/globals';

// import type definitions
import type { QuestionType } from '@typedefs/question-type';

// import scripts
import init from '@scripts/init';
import generateCommands from '@scripts/generate-commands';
import buildFromBlueprint from '@scripts/build-from-blueprint';
import addModule from '@scripts/add-module';
import watch from '@scripts/watch';
import buildFromPrefabs from '@scripts/build-from-prefabs';
import { updateModule } from '@scripts/update-module';
import prefabInit from '@scripts/prefab-init';

const args = hideBin(process.argv);

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
  const config = await getConfigFile();

  if (config) {
    if (args.length === 0) {
      // No arguments were passed but a config file exists
      printMessage('No arguments provided.\r', 'danger');
      parser.showHelp();
      return process.exit(0);
    }

    if (argv.init) {
      printMessage(
        `A ${configFileName} has been found. Please delete it before continuing.\r`,
        'danger'
      );
      return process.exit(0);
    }
  }

  if (args.length === 0 && !argv.manual && !config) {
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

  if (argv.watch) {
    // The user is watching the app for changes
    // Go to watch function
    return watch(config);
  }

  if (argv.build) {
    // The user wants to build the app
    // Go to build function
    return buildFromPrefabs(config);
  }

  if (argv.init) {
    const name = argv.name || argv.n || '';
    const output = argv.root || argv.r || '';
    return init({
      appName: name as string,
      outputDirectory: output as string
    });
  }

  if (argv.prefab) {
    const name = argv.name || argv.n || '';
    const output = argv.root || argv.r || '';
    const pathName = argv.prefabPath || argv.pp || '';
    const packageManager = argv.packageManager || argv.pm || '';

    return prefabInit({
      appName: name as string,
      outputDirectory: output as string,
      pathName: pathName as string,
      packageManager: packageManager as string
    });
  }

  if (argv._[0].toString() === 'add') {
    const module = argv._[1].toString();
    return addModule({ config, path: module });
  }

  if (argv._[0].toString() === 'update') {
    const module = argv._[1].toString();
    return updateModule({ config, module });
  }

  const commands = config ? generateCommands(config) : {};

  const commandString = process.argv[2].replace('--', '');

  const command = commands[commandString];

  if (command) {
    const name = argv._[1].toString();

    return buildFromBlueprint({
      config,
      name,
      command,
      args: argv
    });
  } else {
    return printMessage(
      `'${command}' is not a recognised command.\r`,
      'danger'
    );
  }
})();
