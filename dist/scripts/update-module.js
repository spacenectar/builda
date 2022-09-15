"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateModule = void 0;
const throw_error_1 = __importDefault(require("../helpers/throw-error"));
const add_module_1 = __importDefault(require("./add-module"));
const updateModule = async ({ config, module }) => {
    const moduleName = module.split('@')[0];
    const moduleVersion = module.split('@')[1];
    if (!moduleName) {
        (0, throw_error_1.default)('You must specify a module name');
    }
    let foundModule = null;
    if (config.prefabs && config.prefabs[moduleName]) {
        foundModule = config.prefabs[moduleName];
    }
    if (config.scaffolds && config.scaffolds[moduleName]) {
        foundModule = config.scaffolds[moduleName];
    }
    if (!foundModule) {
        return (0, throw_error_1.default)(`Module ${module} not found in config. Perhaps you meant to run 'builda add ${module}'?`);
    }
    const localVersion = foundModule.version;
    if (moduleVersion && moduleVersion === localVersion) {
        return (0, throw_error_1.default)(`Module ${module} is already at version ${localVersion}`);
    }
    const updatedModule = await (0, add_module_1.default)({
        config,
        path: foundModule.location,
        update: true
    });
    return updatedModule;
};
exports.updateModule = updateModule;
