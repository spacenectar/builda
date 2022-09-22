"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
const publish_1 = __importDefault(require("./publish"));
const { websiteUrl } = globals_1.default;
exports.default = () => {
    return {
        cmd: 'publish',
        desc: 'publish a module',
        aliases: ['i'],
        builder: (yargs) => {
            return yargs.option('version', {
                aliases: ['v', 'ver'],
                default: '',
                describe: 'update module version (semver)',
                type: 'string'
            });
        },
        handler: async (argv) => {
            const config = await (0, helpers_1.getConfigFile)(argv.configPath);
            if (config) {
                return (0, publish_1.default)(argv.version);
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
