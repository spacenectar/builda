#! /usr/bin/env node
"use strict";
// Loop through all files in the 'scaffolds' directory and build a page that lists all the files
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateScaffoldRegistry = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
const generateScaffoldRegistry = (scaffoldPath) => {
    const readPath = scaffoldPath || './scaffolds';
    return fs_1.default.readdirSync(path_1.default.resolve(readPath)).forEach((file) => {
        // Is it a directory?
        const ignore = [...ignore_file_json_1.default.ignore, 'registry.json'];
        if (ignore.includes(file)) {
            return;
        }
        const isDirectory = fs_1.default.lstatSync(`${readPath}/${file}`).isDirectory();
        if (isDirectory) {
            // Build a page for the directory
            const page = `
          {
            "name": "${file}",
            "version": "1.0.0",
            "description": "",
            "files": [
              ${fs_1.default
                .readdirSync(`${readPath}/${file}`)
                .map((f) => {
                if (!ignore.includes(f)) {
                    return `"${f}"`;
                }
                else {
                    return '';
                }
            })
                .filter((f) => f !== '')
                .join(',')}
            ]
          }
      `;
            fs_1.default.writeFileSync(`${readPath}/${file}/registry.json`, JSON.stringify(page, null, 2));
        }
    });
};
exports.generateScaffoldRegistry = generateScaffoldRegistry;
// Run automatically if this file is run directly
if (require.main === module) {
    (0, exports.generateScaffoldRegistry)();
}
exports.default = exports.generateScaffoldRegistry;
