#! /usr/bin/env node
import chalk from 'chalk';
import process from 'node:process';
// Takes a command as an argument and prepends the builda directory to the command

import path from 'node:path';
import execa from 'execa';

import { throwError } from '@helpers';

import globals from '@data/globals';
import { ConfigFile } from '@typedefs/config-file';

export const execute = async (config: ConfigFile, command: string) => {
  if (config) {
    const { run_scripts } = config;
    if (!run_scripts) {
      throwError('No run scripts found in config file');
    }

    const script = run_scripts[command];

    if (!script) {
      throwError(`No script found with the name '${command}'`);
    }

    const cwd = path.join(
      config.app_root,
      globals.buildaDir,
      'build',
      script.cwd || ''
    );

    if (!cwd) {
      throwError(`No path found for script '${command}'`);
    }

    if (!command) {
      throwError('No command found');
    }
    try {
      let command = '';

      if (script.prefix) {
        command += `${script.prefix} `;
      }

      command += script.run;

      if (script.suffix) {
        command += ` ${script.suffix}`;
      }

      process.stdout.write(
        chalk.magenta('Running with Builda: ') +
          chalk.white.bold(`'${command}'`) +
          '\n'
      );
      execa
        .command(command, {
          cwd
        })
        .stdout?.pipe(process.stdout);
    } catch (error) {
      throwError(error.message);
    }
  } else {
    throwError('No config file found');
  }
};

export default execute;
