#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const chalk_1 = __importDefault(require("chalk"));
const node_process_1 = __importDefault(require("node:process"));
// Takes a command as an argument and prepends the builda directory to the command
const node_path_1 = __importDefault(require("node:path"));
const execa_1 = __importDefault(require("execa"));
const _helpers_1 = require("../helpers/index.js");
const globals_1 = __importDefault(require("../data/globals"));
const execute = async (config, command) => {
    var _a;
    if (config) {
        const { run_scripts } = config;
        if (!run_scripts) {
            (0, _helpers_1.throwError)('No run scripts found in config file');
        }
        const script = run_scripts[command];
        if (!script) {
            (0, _helpers_1.throwError)(`No script found with the name '${command}'`);
        }
        const cwd = node_path_1.default.join(config.app_root, globals_1.default.buildaDir, 'build', script.cwd || '');
        if (!cwd) {
            (0, _helpers_1.throwError)(`No path found for script '${command}'`);
        }
        if (!command) {
            (0, _helpers_1.throwError)('No command found');
        }
        try {
            let command = '';
            if (script.prefix) {
                command += `${script.prefix} `;
            }
            command += script.run;
            if (script.suffix) {
                command += ` ${script.suffix}`;
            }
            node_process_1.default.stdout.write(chalk_1.default.magenta('Running with Builda: ') +
                chalk_1.default.white.bold(`'${command}'`) +
                '\n');
            (_a = execa_1.default
                .command(command, {
                cwd
            })
                .stdout) === null || _a === void 0 ? void 0 : _a.pipe(node_process_1.default.stdout);
        }
        catch (error) {
            (0, _helpers_1.throwError)(error.message);
        }
    }
    else {
        (0, _helpers_1.throwError)('No config file found');
    }
};
exports.execute = execute;
exports.default = exports.execute;
