#! /usr/bin/env node
"use strict";
/**
 * This file is for debugging purposes.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debug = void 0;
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const fs_1 = __importDefault(require("fs"));
const init_1 = __importDefault(require("./init"));
const preset_answers_1 = __importDefault(require("../mocks/preset-answers"));
const arguments_json_1 = __importDefault(require("../data/arguments.json"));
const print_message_1 = __importDefault(require("../helpers/print-message"));
const globals_1 = __importDefault(require("../data/globals"));
const { configFileName } = globals_1.default;
const args = (0, helpers_1.hideBin)(process.argv);
const options = Object.assign(Object.assign({}, arguments_json_1.default), { clear: {
        description: 'Deletes generated files',
        required: false,
        boolean: true,
        alias: 'c'
    }, force: {
        description: 'Overwrites existing files',
        required: false,
        boolean: true,
        alias: 'f'
    } });
const parser = (0, yargs_1.default)(args)
    .usage('Usage: $0 [options]')
    .options(options)
    .help('h')
    .version()
    .alias('h', 'help')
    .command('<name..>', 'Create a new component');
const debug = async ({ runInit = false, runClear = false, runPurge = false, force = false }) => {
    const argv = await parser.argv;
    if (argv.force) {
        force = true;
    }
    if (argv.init || runInit) {
        await (0, init_1.default)({ presetAnswers: preset_answers_1.default });
    }
    if (argv.clear || runClear) {
        if (fs_1.default.existsSync('./experiments')) {
            fs_1.default.rmdirSync('experiments', { recursive: true });
            (0, print_message_1.default)('experiments folder has been deleted', 'success');
        }
        process.exit(0);
    }
    if (argv.purge || runPurge) {
        if (fs_1.default.existsSync(configFileName)) {
            fs_1.default.rmSync(configFileName);
            (0, print_message_1.default)(`${configFileName} file has been deleted`, 'success');
        }
        process.exit(0);
    }
};
exports.debug = debug;
exports.default = exports.debug;
if (args.length)
    (0, exports.debug)({});
