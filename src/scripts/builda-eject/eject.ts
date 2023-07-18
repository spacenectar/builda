#! /usr/bin/env node
import process from 'node:process';
import fs from 'node:fs';
import {
  throwError,
  getConfig,
  updateConfig,
  printMessage,
  copyPathsToRoot
} from 'helpers';

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

  if (config.ejected?.includes(pathString)) {
    throwError(`${pathString} has already been ejected.`);
  }

  const trimmedPath = pathString.replace(`${process.cwd()}/`, '');

  const pathInExport = `${process.cwd()}/.builda/export/${trimmedPath}`;

  try {
    if (!fs.existsSync(pathInExport)) {
      throwError(`No file found at ${pathInExport}.`);
    }
    printMessage(`Moving ${trimmedPath} to application...`, 'info');
    // Copy the file to the root directory
    copyPathsToRoot([trimmedPath], process.cwd());
    // Delete the file from the export directory
    printMessage(`Deleting original from ${pathInExport}`, 'info');
    fs.rmSync(pathInExport, { recursive: true, force: true });
    // Update the config to include the ejected file (prevents it from being re-added to the export directory on the next build)
    const relativePath = pathString.replace(`${process.cwd()}/`, '');
    const ejected = config.ejected ?? [];
    ejected.push(relativePath);
    const newConfig = {
      ...config,
      ejected
    };
    updateConfig(newConfig);
    printMessage(
      `Ejected ${pathString}. You can now edit this file directly.`,
      'success'
    );
  } catch (error) {
    throwError(error.message);
  }
};
