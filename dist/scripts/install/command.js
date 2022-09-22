"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
const install_1 = __importDefault(require("./install"));
const { websiteUrl } = globals_1.default;
exports.default = () => {
    return {
        cmd: 'install <modulePath>',
        desc: 'install a module',
        aliases: ['i'],
        builder: (yargs) => {
            return yargs
                .positional('modulePath', {
                describe: `The path to the module (can be a resolver - see http://${websiteUrl}/docs/resolvers)`,
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
                return (0, install_1.default)({ config, modulePath: argv.modulePath });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
