#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const tar_1 = __importDefault(require("tar"));
const helpers_1 = require("../../helpers");
const check_path_exists_1 = require("./helpers/check-path-exists");
exports.default = async (updateVersion) => {
    const registry = await (0, helpers_1.getRegistry)();
    const { name, type, version } = registry;
    const REGISTRYFILE = 'registry.json';
    const READMEFILE = 'README.md';
    const FILESFOLDER = 'module';
    const ignoreFiles = [];
    // Check for an .npmignore file in the root directory if it exists add the files to the ignoreFiles array
    if (node_fs_1.default.existsSync('.npmignore')) {
        const npmIgnore = node_fs_1.default.readFileSync('.npmignore', 'utf8');
        const npmIgnoreFiles = npmIgnore.split('\n');
        ignoreFiles.push(...npmIgnoreFiles);
    }
    // Check for a .gitignore file inside the files folder if it exists add the files to the ignoreFiles array
    if (node_fs_1.default.existsSync(`${FILESFOLDER}/.gitignore`)) {
        const gitignore = node_fs_1.default.readFileSync(`${FILESFOLDER}/.gitignore`, 'utf8');
        const gitignoreFiles = gitignore.split('\n');
        ignoreFiles.push(...gitignoreFiles);
    }
    if (!registry) {
        (0, helpers_1.throwError)(`No ${REGISTRYFILE} file found. Publish can only be ran in the context of a module`);
    }
    if (!name) {
        (0, helpers_1.throwError)(`No name entry found in ${REGISTRYFILE}. Please add one.\r`);
    }
    if (!type) {
        (0, helpers_1.throwError)(`No type entry found in ${REGISTRYFILE}. Please add one.\r`);
    }
    if (!version && !updateVersion) {
        (0, helpers_1.throwError)(`No version entry found in ${REGISTRYFILE}. Please add one.\r`);
    }
    const validateFileFolder = (0, check_path_exists_1.checkPathExists)(FILESFOLDER, true);
    if (validateFileFolder.error) {
        (0, helpers_1.throwError)(validateFileFolder.message);
    }
    const isCorrectlyPrefixed = name.startsWith(`${type}-`);
    if (!isCorrectlyPrefixed) {
        (0, helpers_1.throwError)(`The name entry in ${REGISTRYFILE} must be prefixed with ${type}-.\r`);
    }
    const validateReadme = (0, check_path_exists_1.checkPathExists)(READMEFILE);
    if (validateReadme.error) {
        (0, helpers_1.throwError)(validateReadme.message);
    }
    (0, helpers_1.printMessage)('All checks passed.', 'success');
    const newVersion = (updateVersion === null || updateVersion === void 0 ? void 0 : updateVersion.replace('v', '')) || version;
    const newRegistry = Object.assign(Object.assign({}, registry), { version: newVersion });
    const newRegistryString = JSON.stringify(newRegistry, null, 2);
    node_fs_1.default.writeFileSync(REGISTRYFILE, newRegistryString);
    // Package the files folder into a tarball
    (0, helpers_1.printMessage)(`Packaging ${name}...`, 'processing');
    // If there is already a tarball, delete it
    if (node_fs_1.default.existsSync('module.tgz')) {
        node_fs_1.default.unlinkSync('module.tgz');
    }
    // Create the tarball
    await tar_1.default.create({
        file: `module.tgz`,
        gzip: true,
        cwd: FILESFOLDER,
        filter: (path) => !ignoreFiles.includes(path)
    }, node_fs_1.default.readdirSync(FILESFOLDER));
    (0, helpers_1.printMessage)('Package created', 'success');
};
