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
    const { app_root, package_manager } = config;

    const buildDir = path.join(app_root, globals.buildaDir, 'build');
    const packageJson = require(path.resolve(buildDir, 'package.json'));
    const scripts = packageJson.scripts;
    const script = scripts[command];

    if (!script) {
      throwError(`No script found with the name '${command}'`);
    }

    const cwd = path.resolve(buildDir);

    if (!cwd) {
      throwError(`No path found for script '${command}'`);
    }

    if (!command) {
      throwError('No command found');
    }

    try {
      const prefixedCommand = `${package_manager} run ${command}`;

      process.stdout.write(
        chalk.magenta('Running with Builda: ') +
          chalk.white.bold(`'${prefixedCommand}'`) +
          '\n'
      );
      execa
        .command(prefixedCommand, {
          cwd,
          shell: true,
          stdio: 'inherit'
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
