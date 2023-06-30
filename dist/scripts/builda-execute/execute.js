#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const node_process_1 = __importDefault(require("node:process"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const execa_1 = __importDefault(require("execa"));
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
exports.default = async ({ command, args }) => {
    var _a;
    const cwd = node_process_1.default.cwd();
    let exportDir = node_path_1.default.join(node_process_1.default.cwd(), globals_1.default.buildaDir, 'export');
    if (cwd.split('/').pop() === 'export') {
        // If we're already in the export directory, use the current directory
        exportDir = cwd;
    }
    const packageJsonFile = node_fs_1.default.readFileSync(node_path_1.default.resolve(exportDir, 'package.json'), {
        encoding: 'utf8'
    });
    const packageJson = JSON.parse(packageJsonFile);
    // Update the scripts entry to use 'builda execute'
    const scripts = packageJson.scripts;
    const script = scripts[command];
    let packageManager = '';
    if (node_fs_1.default.existsSync(node_path_1.default.resolve(cwd, 'yarn.lock')) &&
        node_fs_1.default.existsSync(node_path_1.default.resolve(cwd, 'package-lock.json'))) {
        (0, helpers_1.throwError)('Builda detected a yarn.lock file and a package-lock.json file. Please delete one of these files and try again');
    }
    else if (node_fs_1.default.existsSync(node_path_1.default.resolve(cwd, 'yarn.lock'))) {
        packageManager = 'yarn';
    }
    else if (node_fs_1.default.existsSync(node_path_1.default.resolve(cwd, 'package-lock.json'))) {
        packageManager = 'npm';
    }
    else {
        (0, helpers_1.throwError)('Builda could not detect a yarn.lock or package-lock.json file. Please run `yarn` or `npm install` and try again');
    }
    if (!script) {
        (0, helpers_1.throwError)(`No script found with the name '${command}'`);
    }
    if (!exportDir) {
        (0, helpers_1.throwError)(`No path found for script '${command}'`);
    }
    if (!command) {
        (0, helpers_1.throwError)('No command found');
    }
    try {
        let prefixedCommand = `${packageManager} run ${command}`;
        if (args) {
            const argKeys = Object.keys(args);
            const argValues = Object.values(args);
            const argsString = argKeys.reduce((acc, key, index) => {
                const value = argValues[index];
                let keyString = '';
                // If the key is '_' or '$0', we don't need to add it to the string
                if (key === '_' || key === '$0') {
                    return acc;
                }
                // If the key is only one character, we can use a single dash
                if (key.length === 1) {
                    keyString = `-${key}`;
                }
                else {
                    // If the key is more than one character, we need to use two dashes
                    keyString = `--${key}`;
                }
                // If the value is a boolean, we don't need to add the value to the string
                if (value && typeof value === 'boolean') {
                    return `${acc} ${keyString}`;
                }
                return `${acc} ${keyString}="${value}"`;
            }, '');
            prefixedCommand = `${prefixedCommand} ${argsString}`;
        }
        node_process_1.default.stdout.write(chalk_1.default.magenta('Running with Builda: ') +
            chalk_1.default.white.bold(`'${prefixedCommand}'`) +
            '\n');
        (_a = execa_1.default
            .command(prefixedCommand, {
            cwd: exportDir,
            stdio: 'inherit'
        })
            .stdout) === null || _a === void 0 ? void 0 : _a.pipe(node_process_1.default.stdout);
    }
    catch (error) {
        (0, helpers_1.throwError)(error.message);
    }
};
