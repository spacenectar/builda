#! /usr/bin/env node
import chalk from 'chalk';
import process from 'node:process';

import path from 'node:path';
import fs from 'node:fs';
import execa from 'execa';

import { throwError } from 'helpers';

import globals from 'data/globals';

type TExecute = {
  command: string;
  args?: Record<string, string>;
};

/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
export default async ({ command, args }: TExecute) => {
  const cwd = process.cwd();
  let exportDir = path.join(process.cwd(), globals.buildaDir, 'export');
  if (cwd.split('/').pop() === 'export') {
    // If we're already in the export directory, use the current directory
    exportDir = cwd;
  }
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
  } else if (fs.existsSync(path.resolve(cwd, 'yarn.lock'))) {
    packageManager = 'yarn';
  } else if (fs.existsSync(path.resolve(cwd, 'package-lock.json'))) {
    packageManager = 'npm';
  } else {
    throwError(
      'Builda could not detect a yarn.lock or package-lock.json file. Please run `yarn` or `npm install` and try again'
    );
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
    let prefixedCommand = `${packageManager} run ${command}`;
    if (args) {
      const argKeys = Object.keys(args);
      const argValues = Object.values(args);
      const argsString = argKeys.reduce((acc, key, index) => {
        const value = argValues[index];
        let keyString = '';

        // If the key is '_', 'command' or '$0', we don't need to add it to the string
        if (key === '_' || key === 'command' || key === '$0') {
          return acc;
        }

        // If the key is only one character, we can use a single dash
        if (key.length === 1) {
          keyString = `-${key}`;
        } else {
          // If the key is more than one character, we need to use two dashes
          keyString = `--${key}`;
        }

        // If the value is a boolean, we don't need to add the value to the string
        if (value && typeof value === 'boolean') {
          return ` ${acc} ${keyString}`;
        }
        return ` ${acc} ${keyString}="${value}"`;
      }, '');
      prefixedCommand = `${prefixedCommand}${argsString}`;
    }

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
