#! /usr/bin/env node

import fs from 'node:fs';

import { simpleGit } from 'simple-git';

import { getRegistry, printMessage, throwError } from 'helpers';
import { publishToTradeStore as PTS } from './helpers/publish-to-trade-store';
import { checkPathExists } from './helpers/check-path-exists';

export default async (updateVersion?: string) => {
  const registry = await getRegistry();
  const { name, type, version, publishToTradeStore } = registry;

  const REGISTRYFILE = 'registry.json';
  const READMEFILE = 'README.md';
  const MODULEPACKAGE = 'files.tgz';

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

  if (!publishToTradeStore) {
    printMessage(
      `No tradeStore entry found in ${REGISTRYFILE}.\nThis module will not be published to the Builda Trade Store (https://builda.app/trade-store).\r`,
      'info'
    );
  }

  if (!fs.existsSync(MODULEPACKAGE)) {
    throwError(
      `No ${MODULEPACKAGE} file found. Please run 'builda package' before publishing.\r`
    );
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

  const git = simpleGit();

  if (!git.checkIsRepo()) {
    throwError(
      `This is not a git repository. Please initialise git and try again.\r`
    );
  }

  const status = await git.status();

  if (!status.isClean()) {
    throwError(
      `The git repository is not clean. Please commit all changes and try again.\r`
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

  // Add new tarball to git
  printMessage(`Adding ${MODULEPACKAGE} to git...`, 'processing');
  await git.add(`${MODULEPACKAGE}`);
  await git.commit(`Adds updated ${MODULEPACKAGE}`);
  printMessage('Added to git', 'success');
  printMessage('Tagging the latest commit...', 'processing');
  // If tag already exists, throw an error
  const tagList = await git.tags();
  const tagExists =
    tagList.all.includes(newVersion) || tagList.all.includes(`v${newVersion}`);
  if (tagExists) {
    throwError(
      `A tag with the version number v${newVersion} already exists. Please update the version number in ${REGISTRYFILE} and try again.\r`
    );
  }
  // Tag the commit with the current version number
  await git.addTag(`v${newVersion}`);
  let tagString = 'tags';
  if (registry.prerelease) {
    // TODO: Refactor the below code to add a 'next' tag if the prerelease entry is true
    printMessage(
      'Prerelease entry found in registry.json. Skipping latest tag...',
      'info'
    );
    tagString = 'tag';
  } else {
    // Check if the remote has a latest tag
    const remoteTags = await git.listRemote(['--tags']);
    const remoteTagExists = remoteTags.includes('refs/tags/latest');
    const localTags = await git.tags();
    const localTagExists = localTags.all.includes('latest');
    if (remoteTagExists || localTagExists) {
      // Remove the 'latest' tag
      await git.tag(['--delete', 'latest']);
      // Remove the remote 'latest' tag
      await git.push(['origin', '--delete', 'latest']);
    }
    // Tag the commit with latest
    await git.addTag('latest');
  }
  // Push the tags to the remote
  await git.pushTags('origin');
  printMessage(`${tagString} created.`, 'success');
  printMessage('Pushing changes to git...', 'processing');
  // Push the changes to git
  await git.push();
  printMessage('Changes pushed to git.', 'success');

  // Publish to trade store if 'publishToTradeStore' is true
  if (publishToTradeStore) {
    printMessage('Publishing to the Builda Trade Store...', 'processing');
    PTS();
  }

  printMessage('Module published.', 'success');
};
