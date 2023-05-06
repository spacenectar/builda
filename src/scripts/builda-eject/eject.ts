#! /usr/bin/env node
import { throwError } from 'helpers';
import { ConfigFile } from 'types/config-file';

import { copyPathsToRoot } from 'helpers';

type TEject = {
  config: ConfigFile;
  pathString: string;
};

/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
export default async ({ config, pathString }: TEject) => {
  const { rootDir } = config;

  if (!pathString) {
    throwError('A path must be provided');
  }

  try {
    copyPathsToRoot([pathString], rootDir);
  } catch (error) {
    throwError(error.message);
  }
};
