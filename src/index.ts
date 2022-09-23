#! /usr/bin/env node

// import process from 'node:process';
import yargs from 'yargs';

// import data
import globals from 'data/globals';

import { command as projectCommand } from 'scripts/builda-project';
import { command as executeCommand } from 'scripts/builda-execute';
import { command as installCommand } from 'scripts/builda-install';
import { command as publishCommand } from 'scripts/builda-publish';
import { command as updateCommand } from 'scripts/builda-update';
import { command as watchCommand } from 'scripts/builda-watch';
import { command as indexerCommand } from 'scripts/builda-indexer';
import { command as newCommand } from 'scripts/builda-new';

const { websiteUrl } = globals;

// const cwd = process.cwd();
// const isExportDir = cwd.includes(`${globals.buildaDir}/export`);

// const CREATE_CONFIG_QUESTION = {
//   message: `Would you like to create a ${configFileName} config?`,
//   name: 'createConfig',
//   type: 'confirm' as QuestionType
// };

export const builda = async () => {
  yargs
    .command(projectCommand())
    .command(executeCommand())
    .command(installCommand())
    .command(publishCommand())
    .command(updateCommand())
    .command(watchCommand())
    .command(indexerCommand())
    .command(newCommand())
    .epilogue(`For more information, visit ${websiteUrl}/docs`)
    .help('h').argv;
};

if (require.main === module) {
  builda();
}

export default builda;
