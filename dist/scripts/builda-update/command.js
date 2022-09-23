"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const update_1 = __importDefault(require("./update"));
exports.default = () => {
    return {
        command: `${chalk_1.default.green('update')} ${chalk_1.default.blue('<moduleName>')}`,
        desc: chalk_1.default.white('update a module'),
        aliases: ['u'],
        builder: (yargs) => {
            return yargs
                .positional('moduleName', {
                describe: 'The name of the module',
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
                return (0, update_1.default)({
                    config,
                    module: argv.moduleName
                });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
