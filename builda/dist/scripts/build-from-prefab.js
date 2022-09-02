#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFromPrefabs = void 0;
const _helpers_1 = require("../helpers/index.js");
const globals_1 = __importDefault(require("../data/globals"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const buildFromPrefabs = (config) => {
    if (config) {
        const { prefabs } = config;
        const { buildaDir } = globals_1.default;
        if (!prefabs) {
            (0, _helpers_1.throwError)('No prefabs found in config file. Build cannot be run without prefabs');
        }
        // convert the prefabs object to an array
        const prefabArray = Object.keys(prefabs).map((key) => {
            return Object.assign({ name: key }, prefabs[key]);
        });
        // build each prefab
        prefabArray.forEach((prefab) => {
            const sourceDir = path_1.default.join(buildaDir, 'modules', 'prefab', prefab.name);
            const destinationDir = path_1.default.join(buildaDir, 'build');
            fs_1.default.readdir(sourceDir, (err, files) => {
                if (err) {
                    (0, _helpers_1.throwError)(err.message);
                }
                else {
                    files.forEach((file) => {
                        (0, _helpers_1.checkAndCopyPath)(path_1.default.join(sourceDir, file), destinationDir, file);
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
