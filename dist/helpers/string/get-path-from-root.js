"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const helpers_1 = require("helpers");
const getPathFromRoot = (config, pathString) => {
    if (config) {
        const appRoot = config.rootDir || './';
        return path_1.default.join(appRoot, pathString);
    }
    else {
        return (0, helpers_1.throwError)('No config file found');
    }
};
exports.default = getPathFromRoot;
