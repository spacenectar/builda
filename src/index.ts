#! /usr/bin/env node

import yargs from 'yargs';
import chalk from 'chalk';

// import data
import globals from 'data/globals';

import { command as projectCommand } from 'scripts/builda-project';
import { command as executeCommand } from 'scripts/builda-execute';
import { command as installCommand } from 'scripts/builda-install';
import { command as addCommand } from 'scripts/builda-add';
import { command as publishCommand } from 'scripts/builda-publish';
import { command as updateCommand } from 'scripts/builda-update';
import { command as watchCommand } from 'scripts/builda-watch';
import { command as indexerCommand } from 'scripts/builda-indexer';
import { command as newCommand } from 'scripts/builda-new';
import { command as buildCommand } from 'scripts/builda-build';
import { command as initCommand } from 'scripts/builda-init';

const { websiteUrl } = globals;

export const builda = async () => {
  return yargs
    .scriptName(chalk.magenta('builda'))
    .usage(`$0 ${chalk.green('<cmd>')} [args]`)
    .help()
    .command({ ...projectCommand() })
    .command({ ...initCommand() })
    .command({ ...buildCommand() })
    .command({ ...addCommand() })
    .command({ ...installCommand() })
    .command({ ...newCommand() })
    .command({ ...executeCommand() })
    .command({ ...publishCommand() })
    .command({ ...updateCommand() })
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
