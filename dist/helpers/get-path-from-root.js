"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const throw_error_1 = __importDefault(require("./throw-error"));
const getPathFromRoot = (config, pathString) => {
    if (config) {
        const appRoot = config.rootDir || './';
        return path_1.default.join(appRoot, pathString);
    }
    else {
        return (0, throw_error_1.default)('No config file found');
    }
};
exports.default = getPathFromRoot;
