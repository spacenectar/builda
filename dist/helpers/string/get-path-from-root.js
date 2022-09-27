"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const helpers_1 = require("../../helpers");
const getPathFromRoot = (config, pathString) => {
    if (config) {
        const appRoot = config.rootDir || node_process_1.default.cwd();
        return node_path_1.default.join(appRoot, pathString);
    }
    else {
        return (0, helpers_1.throwError)('No config file found');
    }
};
exports.default = getPathFromRoot;
