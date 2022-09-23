"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const init_1 = __importDefault(require("./init"));
exports.default = () => {
    return {
        command: chalk_1.default.green('init'),
        desc: chalk_1.default.white('Initialise builda'),
        aliases: ['$0'],
        builder: (yargs) => {
            return yargs.option('configPath', {
                aliases: ['c', 'config'],
                default: '',
                describe: 'The path to a config file',
                type: 'string'
            });
        },
        handler: async (argv) => {
            const config = await (0, helpers_1.getConfigFile)(argv.configPath);
            return (0, init_1.default)({ config: config || undefined });
        }
    };
};
