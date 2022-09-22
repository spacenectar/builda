#! /usr/bin/env node
import chalk from 'chalk';
import process from 'node:process';

import path from 'node:path';
import execa from 'execa';

import { throwError } from 'helpers';

import globals from 'data/globals';
import { ConfigFile } from 'types/config-file';

type TExecute = {
  config: ConfigFile;
  command: string;
};

/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
export default async ({ config, command }: TExecute) => {
  const { app_root, package_manager } = config;

  const buildDir = path.join(app_root, globals.buildaDir, 'export');
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
        stdio: 'inherit'
      })
      .stdout?.pipe(process.stdout);
  } catch (error) {
    throwError(error.message);
  }
};
