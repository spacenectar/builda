#! /usr/bin/env node

// import process from 'node:process';
import yargs from 'yargs';

// import data
import globals from 'data/globals';

// import scripts
// import addModule from 'scripts/add-module';
// import buildFromBlueprint from 'scripts/build-from-blueprint';
// import buildFromPrefabs from 'scripts/build-from-prefabs';

// import generateCommands from 'scripts/generate-commands';
// import generateIndexes from 'scripts/generate-indexes';
// import init from 'scripts/init';
// import publishModule from 'scripts/publish-module';
// import updateModule from 'scripts/update-module';
// import watch from 'scripts/watch';

import { command as project } from 'scripts/project';
import { command as execute } from 'scripts/execute';
import { command as install } from 'scripts/install';
import { command as publish } from 'scripts/publish';
import { command as update } from 'scripts/update';

const { websiteUrl } = globals;

// const cwd = process.cwd();
// const isExportDir = cwd.includes(`${globals.buildaDir}/export`);

// const CREATE_CONFIG_QUESTION = {
//   message: `Would you like to create a ${configFileName} config?`,
//   name: 'createConfig',
//   type: 'confirm' as QuestionType
// };

const projectCommand = project();
const executeCommand = execute();
const installCommand = install();
const publishCommand = publish();
const updateCommand = update();

export const builda = async () => {
  yargs
    .command(projectCommand)
    .command(executeCommand)
    .command(installCommand)
    .command(publishCommand)
    .command(updateCommand)
    .epilogue(`For more information, visit ${websiteUrl}/docs`)
    .help('h').argv;
};

if (require.main === module) {
  builda();
}

export default builda;
