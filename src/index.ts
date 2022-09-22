#! /usr/bin/env node

// import process from 'node:process';
import yargs from 'yargs';

// import data
import globals from 'data/globals';

import { command as project } from 'scripts/project';
import { command as execute } from 'scripts/execute';
import { command as install } from 'scripts/install';
import { command as publish } from 'scripts/publish';
import { command as update } from 'scripts/update';
import { command as watch } from 'scripts/watch';
import { command as indexer } from 'scripts/indexer';

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
const watchCommand = watch();
const indexerCommand = indexer();

export const builda = async () => {
  yargs
    .command(projectCommand)
    .command(executeCommand)
    .command(installCommand)
    .command(publishCommand)
    .command(updateCommand)
    .command(watchCommand)
    .command(indexerCommand)
    .epilogue(`For more information, visit ${websiteUrl}/docs`)
    .help('h').argv;
};

if (require.main === module) {
  builda();
}

export default builda;
