#! /usr/bin/env node
"use strict";
// Watch for changes in the 'scaffolds' directory and run the 'generate-scaffold-registry' script when changes are detected
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchPrefab = void 0;
const _helpers_1 = require("../helpers/index.js");
const chokidar_1 = __importDefault(require("chokidar"));
const watchPrefab = (config, prefab) => {
    const watchedPaths = config.watched.map((pathString) => (0, _helpers_1.getPathFromRoot)(config, pathString)) ||
        [];
    const watcher = chokidar_1.default.watch(watchedPaths, {
        persistent: true
    });
    watcher.on('ready', () => {
        (0, _helpers_1.printMessage)('Watching for changes...', 'primary');
        (0, _helpers_1.printMessage)('Press Ctrl+C to stop watching', 'notice');
    });
    watcher.on('change', (path) => {
        console.log(`File ${path} has been changed`);
        console.log(`Moving file to ./builda/modules/prefab/${prefab}`);
    });
};
exports.watchPrefab = watchPrefab;
exports.default = exports.watchPrefab;
