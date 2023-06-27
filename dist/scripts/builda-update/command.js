"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const update_1 = __importDefault(require("./update"));
exports.default = () => {
    return {
        command: 'update <moduleName>',
        desc: 'update a module',
        aliases: ['u'],
        builder: (yargs) => {
            return yargs
                .positional('moduleName', {
                describe: 'The name of the module',
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
            const config = await (0, helpers_1.getConfig)();
            if (config) {
                return (0, update_1.default)({
                    config,
                    module: argv.moduleName
                });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
