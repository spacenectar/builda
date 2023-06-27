#! /usr/bin/env node
import chalk from 'chalk';
import process from 'node:process';

import path from 'node:path';
import fs from 'node:fs';
import execa from 'execa';

import { throwError, printMessage } from 'helpers';

import globals from 'data/globals';

type TExecute = {
  command: string;
};

/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
export default async ({ command }: TExecute) => {
  const cwd = process.cwd();
  const exportDir = path.join(cwd, globals.buildaDir, 'export');
  const packageJsonFile = fs.readFileSync(
    path.resolve(exportDir, 'package.json'),
    {
      encoding: 'utf8'
    }
  );
  const packageJson = JSON.parse(packageJsonFile);

  // Update the scripts entry to use 'builda execute'
  const scripts = packageJson.scripts as Record<string, string>;
  const script = scripts[command];

  let packageManager = '';

  if (
    fs.existsSync(path.resolve(cwd, 'yarn.lock')) &&
    fs.existsSync(path.resolve(cwd, 'package-lock.json'))
  ) {
    throwError(
      'Builda detected a yarn.lock file and a package-lock.json file. Please delete one of these files and try again'
    );
  }

  if (fs.existsSync(path.resolve(cwd, 'yarn.lock'))) {
    printMessage('yarn lockfile found, using Yarn as script runner', 'success');
    packageManager = 'yarn';
  }

  if (fs.existsSync(path.resolve(cwd, 'package-lock.json'))) {
    printMessage('NPM lockfile found, using NPM as script runner', 'success');
    packageManager = 'npm';
  }

  if (!script) {
    throwError(`No script found with the name '${command}'`);
  }

  if (!exportDir) {
    throwError(`No path found for script '${command}'`);
  }

  if (!command) {
    throwError('No command found');
  }

  try {
    const prefixedCommand = `${packageManager} run ${command}`;

    process.stdout.write(
      chalk.magenta('Running with Builda: ') +
        chalk.white.bold(`'${prefixedCommand}'`) +
        '\n'
    );
    execa
      .command(prefixedCommand, {
        cwd: exportDir,
        stdio: 'inherit'
      })
      .stdout?.pipe(process.stdout);
  } catch (error) {
    throwError(error.message);
  }
};
