"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
/**
 * Packages a module and publishes it to the repository and optionally to the trade store.
 */
const check_path_exists = (pathString, isDir) => {
    // For now, just check if the README file exists
    if (!node_fs_1.default.existsSync(pathString)) {
        return {
            error: true,
            message: `Cannot find ${isDir && 'a folder called'} '${pathString}' in the current directory.`
        };
    }
    return {
        error: false,
        message: ''
    };
};
