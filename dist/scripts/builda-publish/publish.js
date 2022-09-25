#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const tar_1 = __importDefault(require("tar"));
const simple_git_1 = require("simple-git");
const helpers_1 = require("helpers");
const publish_to_trade_store_1 = require("./helpers/publish-to-trade-store");
const check_path_exists_1 = require("./helpers/check-path-exists");
const helpers_2 = require("helpers");
exports.default = async (updateVersion) => {
    const registry = await (0, helpers_1.getRegistry)();
    const { name, type, version, tradeStore } = registry;
    const REGISTRYFILE = 'registry.json';
    const READMEFILE = 'README.md';
    const FILESFOLDER = 'files';
    if (!registry) {
        (0, helpers_2.throwError)(`No ${REGISTRYFILE} file found. Publish can only be ran in the context of a module`);
    }
    if (!name) {
        (0, helpers_2.throwError)(`No name entry found in ${REGISTRYFILE}. Please add one.\r`);
    }
    if (!type) {
        (0, helpers_2.throwError)(`No type entry found in ${REGISTRYFILE}. Please add one.\r`);
    }
    if (!version && !updateVersion) {
        (0, helpers_2.throwError)(`No version entry found in ${REGISTRYFILE}. Please add one.\r`);
    }
    if (!tradeStore) {
        (0, helpers_1.printMessage)(`No tradeStore entry found in ${REGISTRYFILE}.\nThis module will not be published to the Builda Trade Store (https://builda.app/trade-store).\r`, 'info');
    }
    const validateFileFolder = (0, check_path_exists_1.checkPathExists)(FILESFOLDER, true);
    if (validateFileFolder.error) {
        (0, helpers_2.throwError)(validateFileFolder.message);
    }
    const isCorrectlyPrefixed = name.startsWith(`${type}-`);
    if (!isCorrectlyPrefixed) {
        (0, helpers_2.throwError)(`The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`);
    }
    const validateReadme = (0, check_path_exists_1.checkPathExists)(READMEFILE);
    if (validateReadme.error) {
        (0, helpers_2.throwError)(validateReadme.message);
    }
    const git = (0, simple_git_1.simpleGit)();
    if (!git.checkIsRepo()) {
        (0, helpers_2.throwError)(`This is not a git repository. Please initialise git and try again.\r`);
    }
    const status = await git.status();
    if (!status.isClean()) {
        (0, helpers_2.throwError)(`The git repository is not clean. Please commit all changes and try again.\r`);
    }
    (0, helpers_1.printMessage)('All checks passed.', 'success');
    const newVersion = (updateVersion === null || updateVersion === void 0 ? void 0 : updateVersion.replace('v', '')) || version;
    const newRegistry = Object.assign(Object.assign({}, registry), { version: newVersion });
    const newRegistryString = JSON.stringify(newRegistry, null, 2);
    node_fs_1.default.writeFileSync(REGISTRYFILE, newRegistryString);
    // Package the files folder into a tarball
    (0, helpers_1.printMessage)(`Packaging ${name}...`, 'processing');
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
    (0, helpers_1.printMessage)('Package created', 'success');
    // Add new tarball to git
    (0, helpers_1.printMessage)(`Adding ${FILESFOLDER}.tgz to git...`, 'processing');
    await git.add(`${FILESFOLDER}.tgz`);
    await git.commit(`Adds updated ${FILESFOLDER}.tgz`);
    (0, helpers_1.printMessage)('Added to git', 'success');
    (0, helpers_1.printMessage)('Tagging the latest commit...', 'processing');
    // If tag already exists, throw an error
    const tagList = await git.tags();
    const tagExists = tagList.all.includes(newVersion) || tagList.all.includes(`v${newVersion}`);
    if (tagExists) {
        (0, helpers_2.throwError)(`A tag with the version number v${newVersion} already exists. Please update the version number in ${REGISTRYFILE} and try again.\r`);
    }
    // Tag the commit with the current version number
    await git.addTag(`v${newVersion}`);
    let tagString = 'tags';
    if (registry.prerelease) {
        (0, helpers_1.printMessage)('Prerelease entry found in registry.json. Skipping latest tag...', 'info');
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
    (0, helpers_1.printMessage)(`${tagString} created.`, 'success');
    (0, helpers_1.printMessage)('Pushing changes to git...', 'processing');
    // Push the changes to git
    await git.push();
    (0, helpers_1.printMessage)('Changes pushed to git.', 'success');
    // Publish to trade store if 'tradeStore' is true
    if (tradeStore) {
        (0, helpers_1.printMessage)('Publishing to the Builda Trade Store...', 'processing');
        (0, publish_to_trade_store_1.publishToTradeStore)();
    }
    (0, helpers_1.printMessage)('Module published.', 'success');
};
