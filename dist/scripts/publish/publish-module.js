#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishModule = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const tar_1 = __importDefault(require("tar"));
const simple_git_1 = require("simple-git");
const get_registry_1 = __importDefault(require("../../helpers/get-registry"));
const print_message_1 = __importDefault(require("../../helpers/print-message"));
/**
 * Packages a module and publishes it to the repository and optionally to the trade store.
 */
const checkPathExists = (pathString, isDir) => {
    // For now, just check if the README file exists
    if (!node_fs_1.default.existsSync(pathString)) {
        return {
            error: true,
            message: `Cannot find ${isDir && 'a folder called'} '${pathString}' in the current directory.`
        };
    }
    return {
        error: false,
        message: ''
    };
};
const publishToTradeStore = async () => {
    // TODO: Publish to trade store
    return true;
};
const publishModule = async (updateVersion) => {
    const registry = await (0, get_registry_1.default)();
    const { name, type, version, tradeStore } = registry;
    const REGISTRYFILE = 'registry.json';
    const READMEFILE = 'README.md';
    const FILESFOLDER = 'files';
    if (!registry) {
        return (0, print_message_1.default)(`No ${REGISTRYFILE} file found. Publish can only be ran in the context of a module`, 'danger');
    }
    if (!name) {
        return (0, print_message_1.default)(`No name entry found in ${REGISTRYFILE}. Please add one.\r`, 'danger');
    }
    if (!type) {
        return (0, print_message_1.default)(`No type entry found in ${REGISTRYFILE}. Please add one.\r`, 'danger');
    }
    if (!version && !updateVersion) {
        return (0, print_message_1.default)(`No version entry found in ${REGISTRYFILE}. Please add one.\r`, 'danger');
    }
    if (!tradeStore) {
        (0, print_message_1.default)(`No tradeStore entry found in ${REGISTRYFILE}.\nThis module will not be published to the Builda Trade Store (https://builda.app/trade-store).\r`, 'info');
    }
    const validateFileFolder = checkPathExists(FILESFOLDER, true);
    if (validateFileFolder.error) {
        return (0, print_message_1.default)(validateFileFolder.message, 'danger');
    }
    const isCorrectlyPrefixed = name.startsWith(`${type}-`);
    if (!isCorrectlyPrefixed) {
        return (0, print_message_1.default)(`The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`, 'danger');
    }
    const validateReadme = checkPathExists(READMEFILE);
    if (validateReadme.error) {
        return (0, print_message_1.default)(validateReadme.message, 'error');
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
    const newVersion = (updateVersion === null || updateVersion === void 0 ? void 0 : updateVersion.replace('v', '')) || version;
    const newRegistry = Object.assign(Object.assign({}, registry), { version: newVersion });
    const newRegistryString = JSON.stringify(newRegistry, null, 2);
    node_fs_1.default.writeFileSync(REGISTRYFILE, newRegistryString);
    // Package the files folder into a tarball
    (0, print_message_1.default)(`Packaging ${name}...`, 'processing');
    // If there is already a tarball, delete it
    if (node_fs_1.default.existsSync('files.tgz')) {
        node_fs_1.default.unlinkSync('files.tgz');
    }
    // Create the tarball
    await tar_1.default.create({
        file: `${FILESFOLDER}.tgz`,
        gzip: true,
        cwd: FILESFOLDER
    }, node_fs_1.default.readdirSync(FILESFOLDER));
    (0, print_message_1.default)('Package created', 'success');
    // Add new tarball to git
    (0, print_message_1.default)(`Adding ${FILESFOLDER}.tgz to git...`, 'processing');
    await git.add(`${FILESFOLDER}.tgz`);
    await git.commit(`Adds updated ${FILESFOLDER}.tgz`);
    (0, print_message_1.default)('Added to git', 'success');
    (0, print_message_1.default)('Tagging the latest commit...', 'processing');
    // If tag already exists, throw an error
    const tagList = await git.tags();
    const tagExists = tagList.all.includes(newVersion) || tagList.all.includes(`v${newVersion}`);
    if (tagExists) {
        return (0, print_message_1.default)(`A tag with the version number v${newVersion} already exists. Please update the version number in ${REGISTRYFILE} and try again.\r`, 'error');
    }
    // Tag the commit with the current version number
    await git.addTag(`v${newVersion}`);
    let tagString = 'tags';
    if (registry.prerelease) {
        (0, print_message_1.default)('Prerelease entry found in registry.json. Skipping latest tag...', 'info');
        tagString = 'tag';
    }
    else {
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
