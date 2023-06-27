#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
exports.default = async ({ pathString }) => {
    if (!pathString) {
        (0, helpers_1.throwError)('A path must be provided');
    }
    try {
        (0, helpers_2.copyPathsToRoot)([pathString], node_process_1.default.cwd());
    }
    catch (error) {
        (0, helpers_1.throwError)(error.message);
    }
};
