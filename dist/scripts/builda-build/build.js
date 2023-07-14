#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Run a build
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
const ignore_file_json_1 = __importDefault(require("../../data/ignore-file.json"));
const ignored = ignore_file_json_1.default.ignore;
exports.default = async ({ config, onlyPath }) => {
    var _a;
    const { prefab } = config;
    const root = process.cwd();
    const workingDir = node_path_1.default.join(root, globals_1.default.buildaDir);
    const exportRoot = node_path_1.default.join(workingDir, 'export');
    const registry = await (0, helpers_1.getRegistry)(exportRoot);
    const uniqueAppFiles = ((_a = registry.generatorOptions) === null || _a === void 0 ? void 0 : _a.applicationOnlyFiles) || [];
    const ignoredFiles = [...ignored, ...uniqueAppFiles.map((file) => file.path)];
    if (!prefab) {
        (0, helpers_1.throwError)('No prefab found in config file. Build cannot be run without a prefab');
    }
    if (onlyPath) {
        const cleanRoot = root.replace(/\.\//, '');
        if (ignoredFiles.includes(onlyPath)) {
            return;
        }
        (0, helpers_1.copyPath)(onlyPath, `${globals_1.default.buildaDir}/export`, onlyPath.replace(cleanRoot, ''));
    }
    else {
        const promises = [];
        (0, helpers_1.printMessage)('Building your project', 'processing');
        // Get a list of all of the files in the root directory
        node_fs_1.default.readdir(root, (err, files) => {
            if (err) {
                (0, helpers_1.throwError)(err.message);
            }
            files.forEach((file) => {
                if (!ignoredFiles.includes(file)) {
                    (0, helpers_1.copyPath)(`${root}/${file}`, `${globals_1.default.buildaDir}/export`, file);
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
