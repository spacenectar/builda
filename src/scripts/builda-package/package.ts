#! /usr/bin/env node

import fs from 'node:fs';
import tar from 'tar';

import {
  getRegistry,
  printMessage,
  printSiteLink,
  throwError,
  confirm
} from 'helpers';
import { checkPathExists } from './helpers/check-path-exists';

export default async (updateVersion?: string) => {
  const registry = await getRegistry();
  const { name, type, version } = registry;

  const REGISTRYFILE = 'registry.json';
  const FILESFOLDER = 'module';

  const ignoreFiles = [] as string[];
  // Check for an .npmignore file in the root directory if it exists add the files to the ignoreFiles array
  if (fs.existsSync('.npmignore')) {
    const npmIgnore = fs.readFileSync('.npmignore', 'utf8');
    const npmIgnoreFiles = npmIgnore
      .split('\n')
      .filter(
        (line) => line !== '' && !line.startsWith('#') && !line.startsWith('!')
      );
    ignoreFiles.push(...npmIgnoreFiles);
  }

  // Check for a .gitignore file inside the files folder if it exists add the files to the ignoreFiles array
  if (fs.existsSync(`${FILESFOLDER}/.gitignore`)) {
    const gitignore = fs.readFileSync(`${FILESFOLDER}/.gitignore`, 'utf8');
    const gitignoreFiles = gitignore
      .split('\n')
      .filter(
        (line) => line !== '' && !line.startsWith('#') && !line.startsWith('!')
      );
    ignoreFiles.push(...gitignoreFiles);
  }

  // If a .builda file is in the ignoreFiles array remove it
  if (ignoreFiles.includes('.builda')) {
    ignoreFiles.splice(ignoreFiles.indexOf('.builda'), 1);
  }

  if (!registry) {
    throwError(
      `No ${REGISTRYFILE} file found. See ${printSiteLink({
        link: 'docs/packaging'
      })} for more information.`
    );
  }

  if (!name) {
    throwError(`No name entry found in ${REGISTRYFILE}. Please add one.\r`);
  }

  if (!type) {
    throwError(`No type entry found in ${REGISTRYFILE}. Please add one.\r`);
  }

  if (!version && !updateVersion) {
    throwError(`No version entry found in ${REGISTRYFILE}. Please add one.\r`);
  }

  const validateFileFolder = checkPathExists(FILESFOLDER, true);

  if (validateFileFolder.error) {
    throwError(validateFileFolder.message);
  }

  const isCorrectlyPrefixed = name.startsWith(`${type}-`);

  if (!isCorrectlyPrefixed) {
    throwError(
      `The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`
    );
  }

  printMessage('All checks passed.', 'success');

  const newVersion = updateVersion?.replace('v', '') || version;

  const newRegistry = {
    ...registry,
    version: newVersion
  };

  const newRegistryString = JSON.stringify(newRegistry, null, 2);

  fs.writeFileSync(REGISTRYFILE, newRegistryString);

  // Package the files folder into a tarball
  // If there is already a tarball confirm if the user wants to overwrite it
  if (fs.existsSync(`${FILESFOLDER}.tgz`)) {
    printMessage(
      'A module package already exists. Do you want to overwrite it?',
      'warning'
    );
    const overwrite = await confirm('Overwrite?');
    if (!overwrite) {
      printMessage('Package process aborted', 'error');
      return;
    }
    fs.unlinkSync(`${FILESFOLDER}.tgz`);
  }

  printMessage(`Packaging ${name}...`, 'processing');
  // Create the tarball
  await tar.create(
    {
      file: `${FILESFOLDER}.tgz`,
      gzip: true,
      cwd: FILESFOLDER,
      filter: (path) => !ignoreFiles.includes(path)
    },
    fs.readdirSync(FILESFOLDER)
  );
  printMessage('Package created', 'success');
};
