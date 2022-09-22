#! /usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import process from 'node:process';

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
import updateModule from '@scripts/update-module';
import prefabInit from '@scripts/prefab-init';
import execute from '@scripts/execute';
import generateIndexes from '@scripts/generate-indexes';
import publishModule from '@scripts/publish-module';

// Check to see if the command is being run from the root of the project or from the .builda/export directory
// If it's being run from the export directory, then we need to change the working directory to the root of the project

const cwd = process.cwd();
const isExportDir = cwd.includes(`${globals.buildaDir}/export`);

if (isExportDir) {
  process.chdir('../..');
}

const args = hideBin(process.argv);

const { configFileName, websiteUrl } = globals;

const parser = yargs(args)
  .usage('Usage: $0 [options]')
  .options(arguments as { [key: string]: yargs.Options })
  .help('h')
  .version()
  .alias('h', 'help')
  .epilogue(`For more information, visit ${websiteUrl}`);

const CREATE_CONFIG_QUESTION = {
  message: `Would you like to create a ${configFileName} config?`,
  name: 'createConfig',
  type: 'confirm' as QuestionType
};

(async () => {
  const argv = await parser.argv;
  const config = await getConfigFile();

  if (config) {
    // The following commands are available when a config file is present
    if (args.length === 0) {
      printLogo();
      // No arguments were passed but a config file exists
      printMessage('No arguments provided.\r', 'danger');
      parser.showHelp();
      return process.exit(0);
    }

    if (argv.init) {
      printLogo();
      printMessage(
        `A ${configFileName} has been found. Please delete it before continuing.\r`,
        'danger'
      );
      return process.exit(0);
    }
    if (argv.watch || argv.w) {
      printLogo();
      // The user is watching the app for changes
      // Go to watch function
      return watch(config);
    }

    if (argv.build) {
      printLogo();
      // The user wants to build the app
      // Go to build function
      return buildFromPrefabs(config);
    }

    if (argv.index) {
      printLogo();
      // The user wants to generate indexes
      // Go to generate indexes function
      return generateIndexes(config);
    }

    if (argv.execute || argv.x) {
      // The user wants to execute a command
      // Go to execute function
      const command = (argv.execute || argv.x) as string;
      return execute(config, command);
    }

    if (argv._[0].toString() === 'add') {
      printLogo();
      const module = argv._[1].toString();
      return addModule({ config, modulePath: module });
    }

    if (argv._[0].toString() === 'update') {
      printLogo();
      const module = argv._[1].toString();
      return updateModule({ config, module });
    }
  }

  if (args.length === 0 && !argv.manual && !config) {
    printLogo();
    // No arguments were passed but a config file does not exist
    return askQuestion(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
      if (createConfig) {
        return init({});
      }
      printMessage('Process terminated due to user selection', 'error');
      return process.exit(0);
    });
  }

  // The following commands are available without a config file

  if (argv.manual) {
    printLogo();
    printMessage('Manual mode selected.\r', 'notice');
    printMessage('🛠 This route does not exist yet.\r', 'notice');
    return process.exit(0);
  }

  if (argv.migrate) {
    printLogo();
    // The user wants to migrate an old buildcom config file
    // Go to migrate function
    return printMessage('🛠 This route does not exist yet.\r', 'notice');
  }

  if (argv.init) {
    printLogo();
    const name = argv.name || argv.n || '';
    const output = argv.root || argv.r || '';
    return init({
      appName: name as string,
      outputDirectory: output as string
    });
  }

  if (argv.prefab || argv.p) {
    printLogo();
    const name = argv.name || argv.n || '';
    const pathName = argv.prefabPath || argv.pp || '';
    const packageManager = argv.packageManager || argv.pm || '';

    return prefabInit({
      appName: name as string,
      pathName: pathName as string,
      packageManager: packageManager as string
    });
  }

  if (argv.publish) {
    printLogo();
    // The user wants to publish their module
    // Go to publish function
    return publishModule();
  }

  const commands = config ? generateCommands(config) : {};
  const commandString = process.argv[2].replace('--', '');
  const command = commands[commandString];

  if (command) {
    printLogo();
    const name = argv._[1].toString();

    return buildFromBlueprint({
      config,
      name,
      command,
      args: argv
    });
  } else {
    return printMessage(`'${command}' is not a recognised command.`, 'danger');
  }
})();
