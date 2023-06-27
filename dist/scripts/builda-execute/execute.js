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
exports.default = async ({ command }) => {
    var _a;
    const cwd = node_process_1.default.cwd();
    const exportDir = node_path_1.default.join(cwd, globals_1.default.buildaDir, 'export');
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
    if (node_fs_1.default.existsSync(node_path_1.default.resolve(cwd, 'yarn.lock'))) {
        (0, helpers_1.printMessage)('yarn lockfile found, using Yarn as script runner', 'success');
        packageManager = 'yarn';
    }
    if (node_fs_1.default.existsSync(node_path_1.default.resolve(cwd, 'package-lock.json'))) {
        (0, helpers_1.printMessage)('NPM lockfile found, using NPM as script runner', 'success');
        packageManager = 'npm';
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
        const prefixedCommand = `${packageManager} run ${command}`;
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
