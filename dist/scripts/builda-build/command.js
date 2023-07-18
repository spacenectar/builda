"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const build_1 = __importDefault(require("./build"));
exports.default = () => {
    return {
        command: 'build',
        desc: 'Build your project',
        aliases: ['-b', '--build'],
        builder: (yargs) => {
            return yargs.option('configPath', {
                aliases: ['c', 'config'],
                default: '',
                describe: 'The path to a config file',
                type: 'string'
            });
        },
        handler: async () => {
            const config = await (0, helpers_1.getConfig)();
            if (config) {
                return (0, build_1.default)({
                    config
                });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
