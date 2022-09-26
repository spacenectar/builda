#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const node_process_1 = __importDefault(require("node:process"));
const node_path_1 = __importDefault(require("node:path"));
const execa_1 = __importDefault(require("execa"));
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
/**
 * Takes a command as an argument and prepends the builda directory to the command
 */
exports.default = async ({ config, command }) => {
    var _a;
    const { rootDir, packageManager } = config;
    const buildDir = node_path_1.default.join(rootDir, globals_1.default.buildaDir, 'export');
    const packageJson = require(node_path_1.default.resolve(buildDir, 'package.json'));
    const scripts = packageJson.scripts;
    const script = scripts[command];
    if (!script) {
        (0, helpers_1.throwError)(`No script found with the name '${command}'`);
    }
    const cwd = node_path_1.default.resolve(buildDir);
    if (!cwd) {
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
            cwd,
            stdio: 'inherit'
        })
            .stdout) === null || _a === void 0 ? void 0 : _a.pipe(node_process_1.default.stdout);
    }
    catch (error) {
        (0, helpers_1.throwError)(error.message);
    }
};
