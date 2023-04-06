#! /usr/bin/env node

import fs from 'node:fs';
import tar from 'tar';

import { getRegistry, printMessage, throwError } from 'helpers';
import { checkPathExists } from './helpers/check-path-exists';

export default async (updateVersion?: string) => {
  const registry = await getRegistry();
  const { name, type, version } = registry;

  const REGISTRYFILE = 'registry.json';
  const READMEFILE = 'README.md';
  const FILESFOLDER = 'files';

  if (!registry) {
    throwError(
      `No ${REGISTRYFILE} file found. Publish can only be ran in the context of a module`
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

  const validateReadme = checkPathExists(READMEFILE);

  if (validateReadme.error) {
    throwError(validateReadme.message);
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
  printMessage(`Packaging ${name}...`, 'processing');
  // If there is already a tarball, delete it
  if (fs.existsSync('files.tgz')) {
    fs.unlinkSync('files.tgz');
  }

  // Create the tarball
  await tar.create(
    {
      file: `${FILESFOLDER}.tgz`,
      gzip: true,
      cwd: FILESFOLDER
    },
    fs.readdirSync(FILESFOLDER)
  );
  printMessage('Package created', 'success');
};
