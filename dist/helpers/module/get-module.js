"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Import globals
const globals_1 = __importDefault(require("../../data/globals"));
const getModule = (type, config, command) => {
    if (config) {
        const moduleType = `${type}s`;
        const modulePath = path_1.default.resolve(`${globals_1.default.buildaDir}/modules/${moduleType}/${command.use}`);
        const registry = JSON.parse(fs_1.default.readFileSync(`${modulePath}/registry.json`, 'utf8'));
        return {
            path: modulePath,
            registry
        };
    }
    throw new Error(`Could not find config file`);
};
exports.getModule = getModule;
exports.default = exports.getModule;
