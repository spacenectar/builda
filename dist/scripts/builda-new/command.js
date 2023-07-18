"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const new_1 = __importDefault(require("./new"));
exports.default = () => {
    return {
        command: 'new <scriptName>',
        desc: 'Create something new from a blueprint',
        builder: (yargs) => {
            return yargs
                .positional('scriptName', {
                describe: 'The scaffold script to run',
                type: 'string',
                default: ''
            })
                .positional('name', {
                describe: 'The name of the new thing',
                type: 'string',
                default: ''
            })
                .option('subString', {
                aliases: ['s', 'sub'],
                default: '',
                describe: 'A string matcher for the blueprint script. e.g: "%MY_STRING%:\'new string\'"',
                type: 'string'
            });
        },
        handler: async (argv) => {
            const config = await (0, helpers_1.getConfig)();
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
