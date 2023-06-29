#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const node_fs_1 = __importDefault(require("node:fs"));
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
/**
 * Takes a path as an argument and ejects it to the root directory
 * (deletes the export version of the file and adds it to the 'ejected' array in the builda config)
 */
exports.default = async ({ pathString }) => {
    const config = (0, helpers_1.getConfig)();
    if (!pathString) {
        (0, helpers_1.throwError)('A path must be provided');
    }
    const trimmedPath = pathString.replace(`${node_process_1.default.cwd()}/`, '');
    const pathInExport = `${node_process_1.default.cwd()}/.builda/export/${trimmedPath}`;
    try {
        if (!node_fs_1.default.existsSync(pathInExport)) {
            (0, helpers_1.throwError)(`No file found at ${pathInExport}.`);
        }
        (0, helpers_2.copyPathsToRoot)([pathInExport], node_process_1.default.cwd());
        const relativePath = pathString.replace(`${node_process_1.default.cwd()}/`, '');
        const ejected = config.ejected || [];
        ejected.push(relativePath);
        const newConfig = Object.assign(Object.assign({}, config), { ejected });
        (0, helpers_1.updateConfig)(newConfig);
        node_fs_1.default.unlinkSync(pathString);
        (0, helpers_1.printMessage)(`Ejected ${pathString}. You can now edit this file directly.`, 'success');
    }
    catch (error) {
        (0, helpers_1.throwError)(error.message);
    }
};
