"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const new_1 = __importDefault(require("./new"));
exports.default = () => {
    return {
        command: `${chalk_1.default.green('new')} ${chalk_1.default.blue('<scriptName>')}`,
        desc: chalk_1.default.white('Create something new from a blueprint'),
        builder: (yargs) => {
            return yargs
                .positional('scriptName', {
                describe: 'The scaffold script to run',
                type: 'string'
            })
                .positional('name', {
                describe: 'The name of the new thing',
                type: 'string'
            })
                .option('subString', {
                aliases: ['s', 'sub'],
                default: '',
                describe: 'A string matcher for the blueprint script. e.g: "%MY_STRING%:\'new string\'"',
                type: 'string'
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
                return (0, new_1.default)({
                    config,
                    scriptName: argv.scriptName,
                    name: argv.name
                });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
