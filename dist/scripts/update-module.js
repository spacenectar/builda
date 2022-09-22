"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateModule = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const globals_1 = __importDefault(require("../data/globals"));
const index_1 = require("../helpers/index");
const string_functions_1 = __importDefault(require("../helpers/string-functions"));
const throw_error_1 = __importDefault(require("../helpers/throw-error"));
const updateModule = async ({ config, module }) => {
    const moduleName = module.split('@')[0];
    const moduleVersion = module.split('@')[1];
    if (!moduleName) {
        (0, throw_error_1.default)('You must specify a module name');
    }
    let foundModule = null;
    if (config.prefab) {
        const splitString = config.prefab.split('@');
        foundModule = {
            location: config.prefab,
            version: splitString ? splitString[1] : ''
        };
    }
    if (config.blueprints && config.blueprints[moduleName]) {
        foundModule = config.blueprints[moduleName];
    }
    if (!foundModule) {
        return (0, throw_error_1.default)(`Module ${moduleName} not found in config. Perhaps you meant to run 'builda add ${module}'?`);
    }
    const modulePath = foundModule.location;
    const localVersion = foundModule.version;
    const requestVersion = `${modulePath.split('@')[0]}@${moduleVersion}`;
    if (moduleVersion && moduleVersion === localVersion && localVersion !== '') {
        return (0, throw_error_1.default)(`Module ${moduleName} is already at version ${localVersion}`);
    }
    const moduleType = (0, index_1.detectPathType)(requestVersion);
    let newmodule = {};
    const url = (0, index_1.convertRegistryPathToUrl)(requestVersion, config);
    // TODO: Add documentation for custom resolvers
    if (!url) {
        return (0, throw_error_1.default)(`Could not find resolver for ${requestVersion} in the registry. Please check the URL and try again.`);
    }
    if (moduleType === 'local') {
        newmodule = await (0, index_1.addLocalModule)(requestVersion);
    }
    if (moduleType === 'remote') {
        newmodule = await (0, index_1.addRemoteModule)(url);
    }
    if (moduleType === 'custom') {
        newmodule = await (0, index_1.addRemoteModule)(url);
    }
    if (newmodule === null || newmodule === void 0 ? void 0 : newmodule.name) {
        const type = newmodule.type;
        const name = newmodule.name;
        const version = newmodule.version;
        const newConfig = config.default;
        if (type === 'blueprint') {
            newConfig.blueprints[name] = {
                location: requestVersion,
                version
            };
        }
        if (type === 'prefab') {
            newConfig.prefab = modulePath.split('@')[0];
        }
        return node_fs_1.default.writeFile(globals_1.default.configFileName, JSON.stringify(newConfig, null, 2), (err) => {
            if (err) {
                (0, throw_error_1.default)(err.message);
            }
            (0, index_1.printMessage)(`${(0, string_functions_1.default)(type, 'pascal')}: '${name}' updated to version '${version}'`, 'success');
        });
    }
    return (0, throw_error_1.default)(`Module ${module} not found in config`);
};
exports.updateModule = updateModule;
exports.default = exports.updateModule;
