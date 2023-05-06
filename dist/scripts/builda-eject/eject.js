#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
exports.default = async ({ config, pathString }) => {
    const { rootDir } = config;
    if (!pathString) {
        (0, helpers_1.throwError)('A path must be provided');
    }
    try {
        (0, helpers_2.copyPathsToRoot)([pathString], rootDir);
    }
    catch (error) {
        (0, helpers_1.throwError)(error.message);
    }
};
