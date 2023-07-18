"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const indexer_1 = __importDefault(require("./indexer"));
exports.default = () => {
    return {
        command: 'indexer',
        desc: 'Generate an index file for the specified directories',
        aliases: ['index'],
        builder: (yargs) => {
            return yargs.option('configPath', {
                aliases: ['c', 'config'],
                default: '',
                describe: 'The path to a config file',
                type: 'string'
            });
        },
        handler: async (argv) => {
            const config = await (0, helpers_1.getConfig)();
            if (config) {
                return (0, indexer_1.default)(config);
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
