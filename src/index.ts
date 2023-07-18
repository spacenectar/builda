#! /usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';

// import data
import globals from 'data/globals';

import { command as projectCommand } from 'scripts/builda-project';
import { command as executeCommand } from 'scripts/builda-execute';
import { command as ejectCommand } from 'scripts/builda-eject';
import { command as installCommand } from 'scripts/builda-install';
import { command as addCommand } from 'scripts/builda-add';
import { command as packageCommand } from 'scripts/builda-package';
import { command as publishCommand } from 'scripts/builda-publish';
import { command as watchCommand } from 'scripts/builda-watch';
import { command as indexerCommand } from 'scripts/builda-indexer';
import { command as newCommand } from 'scripts/builda-new';
import { command as buildCommand } from 'scripts/builda-build';
import { command as initCommand } from 'scripts/builda-init';

const { websiteUrl } = globals;

export const builda = async () => {
  return yargs
    .scriptName('builda')
    .usage('$0 <cmd> [args]')
    .help()
    .demandCommand(
      1,
      'You need at least one command before moving on. Try "builda --help" for more information'
    )
    .command({ ...projectCommand() })
    .command({ ...initCommand() })
    .command({ ...buildCommand() })
    .command({ ...addCommand() })
    .command({ ...ejectCommand() })
    .command({ ...installCommand() })
    .command({ ...newCommand() })
    .command({ ...executeCommand() })
    .command({ ...packageCommand() })
    .command({ ...publishCommand() })
    .command({ ...watchCommand() })
    .command({ ...indexerCommand() })
    .epilogue(
      `For more information, visit ${chalk.blue.underline(
        `${websiteUrl}/docs`
      )}`
    ).argv;
};

if (require.main === module) {
  builda();
}

export default builda;
export { buildaQuestion } from './scripts/builda-question';
export { buildaSubstitute } from './scripts/builda-substitute';
export { changeCase, printMessage, throwError } from './helpers';
