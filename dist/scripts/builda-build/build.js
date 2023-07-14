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
exports.default = async ({ config }) => {
    var _a, _b, _c;
    const { prefab } = config;
    const root = process.cwd();
    const workingDir = node_path_1.default.join(root, globals_1.default.buildaDir);
    const exportRoot = node_path_1.default.join(workingDir, 'export');
    const registry = await (0, helpers_1.getRegistry)(exportRoot);
    const uniqueAppFiles = (_c = (_b = (_a = registry.generatorOptions) === null || _a === void 0 ? void 0 : _a.rootFiles) === null || _b === void 0 ? void 0 : _b.filter((file) => {
        const pathString = typeof file === 'string' ? file : file.path;
        if (pathString.startsWith('unique.')) {
            return true;
        }
        return false;
    })) !== null && _c !== void 0 ? _c : [];
    const ignoredFiles = [
        ...ignored,
        ...uniqueAppFiles.map((file) => typeof file === 'string' ? file : file.path)
    ];
    if (!prefab) {
        (0, helpers_1.throwError)('No prefab found in config file. Build cannot be run without a prefab');
    }
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
            promises.push(Promise.resolve(file));
        });
        Promise.all(promises).then(() => {
            (0, helpers_1.printMessage)('Build complete', 'success');
        });
    });
};
