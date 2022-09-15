"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndCopyPath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const checkAndCopyPath = (sourcePath, destinationPath, fileName) => {
    const name = fileName || '';
    // If it's a directory, copy the directory to the destination
    if (fs_1.default.lstatSync(sourcePath).isDirectory()) {
        return fs_1.default.cpSync(sourcePath, path_1.default.join(destinationPath, name), {
            recursive: true,
            force: true
        });
    }
    // If it's a file, copy it to the destination
    if (fs_1.default.lstatSync(sourcePath).isFile()) {
        return fs_1.default.copyFileSync(sourcePath, path_1.default.join(destinationPath, name));
    }
};
exports.checkAndCopyPath = checkAndCopyPath;
exports.default = exports.checkAndCopyPath;
