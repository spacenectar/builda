#! /usr/bin/env node
"use strict";
// Watch for changes in the specified directories and run the 'build' script when changes are detected
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const helpers_1 = require("../../helpers");
const sync_with_export_1 = require("./helpers/sync-with-export");
const ignore_file_json_1 = __importDefault(require("../../data/ignore-file.json"));
exports.default = (config) => {
    const { prefab } = config;
    const ignored = [...ignore_file_json_1.default.ignore, ...(config.ignored || [])];
    if (!prefab) {
        (0, helpers_1.throwError)('No prefab found in config file. Watch cannot be run without a prefab');
    }
    const watcher = chokidar_1.default.watch('.', {
        persistent: true,
        ignoreInitial: true,
        ignored
    });
    watcher
        .on('change', (pathString) => {
        console.log(`File ${pathString} has been changed`);
        (0, sync_with_export_1.syncWithExport)({
            type: 'update',
            pathString
        });
    })
        .on('add', (pathString) => {
        console.log(`File ${pathString} has been added`);
        (0, sync_with_export_1.syncWithExport)({
            type: 'copy',
            pathString
        });
    })
        .on('addDir', (pathString) => {
        console.log(`Directory ${pathString} has been added`);
        (0, sync_with_export_1.syncWithExport)({
            type: 'copy',
            pathString
        });
    })
        .on('unlinkDir', (pathString) => {
        console.log(`Directory ${pathString} has been deleted`);
        (0, sync_with_export_1.syncWithExport)({
            type: 'delete',
            pathString
        });
    })
        .on('unlink', (pathString) => {
        console.log(`File ${pathString} has been deleted`);
        (0, sync_with_export_1.syncWithExport)({
            type: 'delete',
            pathString
        });
    })
        .on('ready', () => {
        (0, helpers_1.printMessage)('Watching for changes...', 'primary');
        (0, helpers_1.printMessage)('Press Ctrl+C to stop watching', 'secondary');
    });
};
