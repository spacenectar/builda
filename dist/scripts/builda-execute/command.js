"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const execute_1 = __importDefault(require("./execute"));
const helpers_1 = require("helpers");
exports.default = () => {
    return {
        command: `${chalk_1.default.green('execute')} ${chalk_1.default.blue('<command>')}`,
        desc: chalk_1.default.white('Execute a command from within the export directory'),
        aliases: ['x', 'exec'],
        builder: (yargs) => {
            return yargs
                .positional('command', {
                describe: 'The name of the command',
                type: 'string',
                demandOption: true
            })
                .option('configPath', {
                aliases: ['c', 'config'],
                default: '',
                describe: 'The path to a config file',
                type: 'string'
            });
        },
        handler: async (argv) => {
            const config = await (0, helpers_1.getConfigFile)(argv.configPath);
            if (config) {
                return (0, execute_1.default)({ config, command: argv.command });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
