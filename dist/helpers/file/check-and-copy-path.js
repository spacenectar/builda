"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyPath = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const copyPath = (sourcePath, destinationPath, fileName) => {
    const name = fileName !== null && fileName !== void 0 ? fileName : '';
    return fs_1.default.cpSync(sourcePath, path_1.default.join(destinationPath, name), {
        dereference: true,
        recursive: true,
        force: true
    });
};
exports.copyPath = copyPath;
exports.default = exports.copyPath;
