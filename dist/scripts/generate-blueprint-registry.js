#! /usr/bin/env node
"use strict";
// Loop through all files in the 'blueprints' directory and build a page that lists all the files
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBlueprintRegistry = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
const generateBlueprintRegistry = (blueprintPath) => {
    const readPath = blueprintPath || './blueprints';
    return node_fs_1.default.readdirSync(node_path_1.default.resolve(readPath)).forEach((file) => {
        // Is it a directory?
        const ignore = [...ignore_file_json_1.default.ignore, 'registry.json'];
        if (ignore.includes(file)) {
            return;
        }
        const isDirectory = node_fs_1.default.lstatSync(`${readPath}/${file}`).isDirectory();
        if (isDirectory) {
            // Build a page for the directory
            const page = `
          {
            "name": "${file}",
            "type": "blueprint",
            "version": "1.0.0",
            "author": {
              "name": "",
              "builda_user:": "",
              "email": "",
              "website": ""
            },
            "url": "",
            "files": [
              ${node_fs_1.default
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
            node_fs_1.default.writeFileSync(`${readPath}/${file}/registry.json`, JSON.stringify(page, null, 2));
        }
    });
};
exports.generateBlueprintRegistry = generateBlueprintRegistry;
// Run automatically if this file is run directly
if (require.main === module) {
    (0, exports.generateBlueprintRegistry)();
}
exports.default = exports.generateBlueprintRegistry;
