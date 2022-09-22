#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishModule = void 0;
const simple_git_1 = require("simple-git");
const get_registry_1 = __importDefault(require("../helpers/get-registry"));
const print_message_1 = __importDefault(require("../helpers/print-message"));
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
const publishModule = async () => {
    const registry = await (0, get_registry_1.default)();
    const { name, type, version, tradeStore } = registry;
    const REGISTRYFILE = 'registry.json';
    if (!registry) {
        return (0, print_message_1.default)(`No ${REGISTRYFILE} file found.`, 'danger');
    }
    if (!name) {
        return (0, print_message_1.default)(`No name entry found in ${REGISTRYFILE}. Please add one.\r`, 'danger');
    }
    if (!type) {
        return (0, print_message_1.default)(`No type entry found in ${REGISTRYFILE}. Please add one.\r`, 'danger');
    }
    if (!version) {
        return (0, print_message_1.default)(`No version entry found in ${REGISTRYFILE}. Please add one.\r`, 'danger');
    }
    if (!tradeStore) {
        (0, print_message_1.default)(`No tradeStore entry found in ${REGISTRYFILE}.\nThis module will not be published to the Builda Trade Store (https://builda.app/trade-store).\r`, 'info');
    }
    const isCorrectlyPrefixed = name.startsWith(`${type}-`);
    if (!isCorrectlyPrefixed) {
        return (0, print_message_1.default)(`The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`, 'danger');
    }
    const isReadmeValid = checkReadme();
    if (!isReadmeValid) {
        return (0, print_message_1.default)(`The readme file is not valid. Please check the readme file and try again.\r`, 'danger');
    }
    const git = (0, simple_git_1.simpleGit)();
    if (!git.checkIsRepo()) {
        return (0, print_message_1.default)(`This is not a git repository. Please initialise git and try again.\r`, 'danger');
    }
    const status = await git.status();
    if (!status.isClean()) {
        return (0, print_message_1.default)(`The git repository is not clean. Please commit all changes and try again.\r`, 'danger');
    }
    (0, print_message_1.default)('All checks passed.', 'success');
    (0, print_message_1.default)('Creating a new commit...', 'processing');
    // Create a new commit
    await git.add('.');
    await git.commit(`v${version}`);
    (0, print_message_1.default)('Commit created.', 'success');
    (0, print_message_1.default)('Tagging the commit...', 'processing');
    // Tag the commit with the current version number
    await git.addTag(`v${version}`);
    let tagString = 'tags';
    if (registry.prerelease) {
        (0, print_message_1.default)('Prerelease entry found in registry.json. Skipping latest tag...', 'info');
        tagString = 'tag';
    }
    else {
        // Remove the 'latest' tag
        await git.tag(['-d', 'latest']);
        // Remove the remote 'latest' tag
        await git.push('origin', ':latest');
        // Tag the commit with latest
        await git.addTag('latest');
    }
    (0, print_message_1.default)(`${tagString} created.`, 'success');
    (0, print_message_1.default)('Pushing changes to git...', 'processing');
    // Push the changes to git
    await git.push();
    (0, print_message_1.default)('Changes pushed to git.', 'success');
    // Publish to trade store if 'tradeStore' is true
    if (tradeStore) {
        (0, print_message_1.default)('Publishing to the Builda Trade Store...', 'processing');
        publishToTradeStore();
    }
    return (0, print_message_1.default)('Module published.', 'success');
};
exports.publishModule = publishModule;
if (require.main === module) {
    (0, exports.publishModule)();
}
exports.default = exports.publishModule;
