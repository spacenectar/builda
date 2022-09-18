#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFromPrefabs = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const _helpers_1 = require("../helpers/index.js");
const globals_1 = __importDefault(require("../data/globals"));
const buildFromPrefabs = (config) => {
    if (config) {
        const { prefabs } = config;
        const { buildaDir } = globals_1.default;
        const destinationDir = node_path_1.default.join(buildaDir, 'build');
        if (!prefabs) {
            (0, _helpers_1.throwError)('No prefabs found in config file. Build cannot be run without prefabs');
        }
        if (!node_fs_1.default.existsSync(destinationDir)) {
            node_fs_1.default.mkdirSync(destinationDir);
        }
        // convert the prefabs object to an array
        const prefabArray = Object.keys(prefabs).map((key) => {
            return Object.assign({ name: key }, prefabs[key]);
        });
        // build each prefab
        prefabArray.forEach((prefab) => {
            const sourceDir = node_path_1.default.join(buildaDir, 'modules', 'prefabs', prefab.name);
            node_fs_1.default.readdir(sourceDir, (err, files) => {
                if (err) {
                    (0, _helpers_1.throwError)(err.message);
                }
                else {
                    files.forEach((file) => {
                        (0, _helpers_1.checkAndCopyPath)(node_path_1.default.join(sourceDir, file), destinationDir, file);
                    });
                }
            });
        });
    }
    else {
        (0, _helpers_1.throwError)('No config file found');
    }
};
exports.buildFromPrefabs = buildFromPrefabs;
exports.default = exports.buildFromPrefabs;
