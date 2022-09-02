"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const getPathFromRoot = (config, pathString) => {
    if (config) {
        const fullPath = path_1.default.join(config.app_root, pathString);
        return fullPath;
    }
    else {
        throw new Error('No config file found');
    }
};
exports.default = getPathFromRoot;
