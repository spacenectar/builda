"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModule = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
// Import globals
const globals_1 = __importDefault(require("../../data/globals"));
const getModule = (type, config, command) => {
    if (config) {
        const moduleType = `${type}s`;
        const modulePath = node_path_1.default.resolve(node_process_1.default.cwd(), `${globals_1.default.buildaDir}/modules/${moduleType}/${command.use}`);
        const registry = JSON.parse(node_fs_1.default.readFileSync(`${modulePath}/registry.json`, 'utf8'));
        return {
            path: modulePath,
            registry
        };
    }
    throw new Error(`Could not find config file`);
};
exports.getModule = getModule;
exports.default = exports.getModule;
