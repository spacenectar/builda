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
            return yargs
                .option('prod', {
                aliases: ['p', 'production'],
                default: '',
                describe: 'Build for production. This will minify the output and remove any debug code',
                type: 'boolean'
            })
                .option('onlyPath', {
                describe: 'If you want to build from a specific path',
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
                return (0, build_1.default)({
                    config,
                    onlyPath: argv.onlyPath,
                    prod: argv.prod
                });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
