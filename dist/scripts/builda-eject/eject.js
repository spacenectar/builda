#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const node_fs_1 = __importDefault(require("node:fs"));
const helpers_1 = require("../../helpers");
/**
 * Takes a path as an argument and ejects it to the root directory
 * (deletes the export version of the file and adds it to the 'ejected' array in the builda config)
 */
exports.default = async ({ pathString }) => {
    var _a, _b;
    const config = (0, helpers_1.getConfig)();
    if (!pathString) {
        (0, helpers_1.throwError)('A path must be provided');
    }
    if ((_a = config.ejected) === null || _a === void 0 ? void 0 : _a.includes(pathString)) {
        (0, helpers_1.throwError)(`${pathString} has already been ejected.`);
    }
    const trimmedPath = pathString.replace(`${node_process_1.default.cwd()}/`, '');
    const pathInExport = `${node_process_1.default.cwd()}/.builda/export/${trimmedPath}`;
    try {
        if (!node_fs_1.default.existsSync(pathInExport)) {
            (0, helpers_1.throwError)(`No file found at ${pathInExport}.`);
        }
        (0, helpers_1.printMessage)(`Moving ${trimmedPath} to application...`, 'info');
        // Copy the file to the root directory
        (0, helpers_1.copyPathsToRoot)([trimmedPath], node_process_1.default.cwd());
        // Delete the file from the export directory
        (0, helpers_1.printMessage)(`Deleting original from ${pathInExport}`, 'info');
        node_fs_1.default.rmSync(pathInExport, { recursive: true, force: true });
        // Update the config to include the ejected file (prevents it from being re-added to the export directory on the next build)
        const relativePath = pathString.replace(`${node_process_1.default.cwd()}/`, '');
        const ejected = (_b = config.ejected) !== null && _b !== void 0 ? _b : [];
        ejected.push(relativePath);
        const newConfig = Object.assign(Object.assign({}, config), { ejected });
        (0, helpers_1.updateConfig)(newConfig);
        (0, helpers_1.printMessage)(`Ejected ${pathString}. You can now edit this file directly.`, 'success');
    }
    catch (error) {
        (0, helpers_1.throwError)(error.message);
    }
};
