#! /usr/bin/env node

import { simpleGit } from 'simple-git';

import getRegistry from '@helpers/get-registry';
import printMessage from '@helpers/print-message';

/**
 * Packages a module and publishes it to the repository and optionally to the trade store.
 */

const checkReadme = () => {
  // TODO: Check that the readme has content and is properly formatted

  return true;
};

const publishToTradeStore = async () => {
  // TODO: Publish to trade store
  return true;
};

export const publishModule = async () => {
  const registry = await getRegistry();
  const { name, type, version, tradeStore } = registry;

  const REGISTRYFILE = 'registry.json';

  if (!registry) {
    return printMessage(`No ${REGISTRYFILE} file found.`, 'danger');
  }

  if (!name) {
    return printMessage(
      `No name entry found in ${REGISTRYFILE}. Please add one.\r`,
      'danger'
    );
  }

  if (!type) {
    return printMessage(
      `No type entry found in ${REGISTRYFILE}. Please add one.\r`,
      'danger'
    );
  }

  if (!version) {
    return printMessage(
      `No version entry found in ${REGISTRYFILE}. Please add one.\r`,
      'danger'
    );
  }

  if (!tradeStore) {
    printMessage(
      `No tradeStore entry found in ${REGISTRYFILE}.\nThis module will not be published to the Builda Trade Store (https://builda.app/trade-store).\r`,
      'info'
    );
  }

  const isCorrectlyPrefixed = name.startsWith(`${type}-`);

  if (!isCorrectlyPrefixed) {
    return printMessage(
      `The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`,
      'danger'
    );
  }

  const isReadmeValid = checkReadme();

  if (!isReadmeValid) {
    return printMessage(
      `The readme file is not valid. Please check the readme file and try again.\r`,
      'danger'
    );
  }

  const git = simpleGit();

  if (!git.checkIsRepo()) {
    return printMessage(
      `This is not a git repository. Please initialise git and try again.\r`,
      'danger'
    );
  }

  const status = await git.status();

  if (!status.isClean()) {
    return printMessage(
      `The git repository is not clean. Please commit all changes and try again.\r`,
      'danger'
    );
  }

  printMessage('All checks passed.', 'success');
  printMessage('Creating a new commit...', 'processing');
  // Create a new commit
  await git.add('.');
  await git.commit(`v${version}`);
  printMessage('Commit created.', 'success');
  printMessage('Tagging the commit...', 'processing');
  // Tag the commit with the current version number
  await git.addTag(`v${version}`);
  let tagString = 'tags';
  if (registry.prerelease) {
    printMessage(
      'Prerelease entry found in registry.json. Skipping latest tag...',
      'info'
    );
    tagString = 'tag';
  } else {
    // Remove the 'latest' tag
    await git.tag(['-d', 'latest']);
    // Remove the remote 'latest' tag
    await git.push('origin', ':latest');
    // Tag the commit with latest
    await git.addTag('latest');
  }
  printMessage(`${tagString} created.`, 'success');
  printMessage('Pushing changes to git...', 'processing');
  // Push the changes to git
  await git.push();
  printMessage('Changes pushed to git.', 'success');

  // Publish to trade store if 'tradeStore' is true
  if (tradeStore) {
    printMessage('Publishing to the Builda Trade Store...', 'processing');
    publishToTradeStore();
  }

  return printMessage('Module published.', 'success');
};

if (require.main === module) {
  publishModule();
}

export default publishModule;
