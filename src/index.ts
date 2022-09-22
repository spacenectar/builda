#! /usr/bin/env node

import process from 'node:process';
import yargs from 'yargs';

// import data
import globals from '@data/globals';

// import type definitions
import type { QuestionType } from '@typedefs/question-type';

// import scripts
// import addModule from '@scripts/add-module';
// import buildFromBlueprint from '@scripts/build-from-blueprint';
// import buildFromPrefabs from '@scripts/build-from-prefabs';

// import generateCommands from '@scripts/generate-commands';
// import generateIndexes from '@scripts/generate-indexes';
// import init from '@scripts/init';
// import publishModule from '@scripts/publish-module';
// import updateModule from '@scripts/update-module';
// import watch from '@scripts/watch';

import { command as project } from '@scripts/project';
import { command as execute } from '@scripts/execute';

const cwd = process.cwd();
const isExportDir = cwd.includes(`${globals.buildaDir}/export`);

const { configFileName, websiteUrl } = globals;

const CREATE_CONFIG_QUESTION = {
  message: `Would you like to create a ${configFileName} config?`,
  name: 'createConfig',
  type: 'confirm' as QuestionType
};

const projectCommand = project();
const executeCommand = execute();

export const builda = async () => {
  yargs
    .command(projectCommand)
    .command(executeCommand)
    .epilogue(`For more information, visit ${websiteUrl}/docs`)
    .help('h').argv;
};

if (require.main === module) {
  builda();
}

export default builda;
