"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const globals_1 = __importDefault(require("../../data/globals"));
const index_1 = require("../../helpers/index");
const string_functions_1 = __importDefault(require("../../helpers/string-functions"));
const throw_error_1 = __importDefault(require("../../helpers/throw-error"));
exports.default = async ({ config, module }) => {
    const moduleName = module.split('@')[0];
    const moduleVersion = module.split('@')[1] || 'latest';
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
    if (foundModule) {
        const modulePath = foundModule.location;
        const localVersion = foundModule.version;
        const requestVersion = `${modulePath.split('@')[0]}@${moduleVersion}`;
        if (moduleVersion &&
            moduleVersion === localVersion &&
            localVersion !== '') {
            (0, throw_error_1.default)(`Module ${moduleName} is already at version ${localVersion}`);
        }
        let newmodule = {};
        const registry = (0, index_1.convertRegistryPathToUrl)({
            registryPath: requestVersion,
            config
        });
        if (registry.error) {
            (0, throw_error_1.default)(registry.error);
        }
        const url = registry.url;
        // TODO: Add documentation for custom resolvers
        if (!url) {
            (0, throw_error_1.default)(`Could not find resolver for ${requestVersion} in the registry. Please check the URL and try again.`);
        }
        newmodule =
            (0, index_1.detectPathType)(requestVersion) === 'remote'
                ? await (0, index_1.addRemoteModule)(url)
                : await (0, index_1.addLocalModule)(requestVersion);
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
    }
    else {
        (0, throw_error_1.default)(`Module ${moduleName} not found in config. Perhaps you meant to run 'builda add ${module}'?`);
    }
    (0, throw_error_1.default)(`Module ${module} not found in config`);
};
