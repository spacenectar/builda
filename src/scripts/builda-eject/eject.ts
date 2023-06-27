#! /usr/bin/env node
import process from 'node:process';
import { throwError } from 'helpers';

import { copyPathsToRoot } from 'helpers';

type TEject = {
  pathString: string;
};

/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
export default async ({ pathString }: TEject) => {
  if (!pathString) {
    throwError('A path must be provided');
  }

  try {
    copyPathsToRoot([pathString], process.cwd());
  } catch (error) {
    throwError(error.message);
  }
};
