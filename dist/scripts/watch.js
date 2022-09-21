#! /usr/bin/env node
"use strict";
// Watch for changes in the specified directories and run the 'sync-watched' script when changes are detected
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watch = void 0;
const chokidar_1 = __importDefault(require("chokidar"));
const _helpers_1 = require("../helpers/index.js");
const globals_1 = __importDefault(require("../data/globals"));
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
const ignored = ignore_file_json_1.default.ignore;
const watch = (config) => {
    if (config) {
        const { prefab, app_root } = config;
        const cleanRoot = app_root.replace(/\.\//, '');
        if (!prefab) {
            (0, _helpers_1.throwError)('No prefab found in config file. Watch cannot be run without a prefab');
        }
        const watcher = chokidar_1.default.watch(config.app_root, {
            persistent: true,
            ignored
        });
        watcher.on('ready', () => {
            (0, _helpers_1.printMessage)('Watching for changes...', 'primary');
            (0, _helpers_1.printMessage)('Press Ctrl+C to stop watching', 'secondary');
        });
        watcher.on('change', (pathString) => {
            console.log(`File ${pathString} has been changed`);
            (0, _helpers_1.checkAndCopyPath)(pathString, `${globals_1.default.buildaDir}/build`, pathString.replace(cleanRoot, ''));
        });
    }
    else {
        (0, _helpers_1.throwError)('No config file found');
    }
};
exports.watch = watch;
exports.default = exports.watch;
