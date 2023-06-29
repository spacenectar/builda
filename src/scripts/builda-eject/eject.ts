#! /usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import { throwError, getConfig, updateConfig, printMessage } from 'helpers';

import { copyPathsToRoot } from 'helpers';

type TEject = {
  pathString: string;
};

/**
 * Takes a path as an argument and ejects it to the root directory
 * (deletes the export version of the file and adds it to the 'ejected' array in the builda config)
 */
export default async ({ pathString }: TEject) => {
  const config = getConfig();
  if (!pathString) {
    throwError('A path must be provided');
  }

  const trimmedPath = pathString.replace(`${process.cwd()}/`, '');

  const pathInExport = `${process.cwd()}/.builda/export/${trimmedPath}`;

  try {
    if (!fs.existsSync(pathInExport)) {
      throwError(`No file found at ${pathInExport}.`);
    }
    copyPathsToRoot([pathInExport], process.cwd());
    const relativePath = pathString.replace(`${process.cwd()}/`, '');
    const ejected = config.ejected || [];
    ejected.push(relativePath);
    const newConfig = {
      ...config,
      ejected
    };
    updateConfig(newConfig);
    fs.unlinkSync(pathString);
    printMessage(
      `Ejected ${pathString}. You can now edit this file directly.`,
      'success'
    );
  } catch (error) {
    throwError(error.message);
  }
};
