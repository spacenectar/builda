#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
// Run a build
const helpers_1 = require("helpers");
const globals_1 = __importDefault(require("data/globals"));
const ignore_file_json_1 = __importDefault(require("data/ignore-file.json"));
const ignored = ignore_file_json_1.default.ignore;
exports.default = async ({ config, prod, onlyPath }) => {
    const { prefab, rootDir } = config;
    const root = rootDir ? rootDir : process.cwd();
    if (!prefab) {
        (0, helpers_1.throwError)('No prefab found in config file. Watch cannot be run without a prefab');
    }
    if (onlyPath) {
        const cleanRoot = root.replace(/\.\//, '');
        (0, helpers_1.checkAndCopyPath)(onlyPath, `${globals_1.default.buildaDir}/export`, onlyPath.replace(cleanRoot, ''));
    }
    else {
        let promises = [];
        (0, helpers_1.printMessage)('Building your project', 'processing');
        // Get a list of all of the files in the root directory
        node_fs_1.default.readdir(root, (err, files) => {
            if (err) {
                (0, helpers_1.throwError)(err.message);
            }
            files.forEach((file) => {
                if (!ignored.includes(file)) {
                    (0, helpers_1.checkAndCopyPath)(`${root}/${file}`, `${globals_1.default.buildaDir}/export`, file);
                }
                promises.push(new Promise((resolve) => {
                    resolve(file);
                }));
            });
            Promise.all(promises).then(() => {
                (0, helpers_1.printMessage)('Build complete', 'success');
            });
        });
    }
};
