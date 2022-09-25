"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("helpers");
const globals_1 = __importDefault(require("data/globals"));
const add_1 = __importDefault(require("./add"));
const chalk_1 = __importDefault(require("chalk"));
const { websiteUrl } = globals_1.default;
exports.default = () => {
    return {
        command: `${chalk_1.default.green('add')} ${chalk_1.default.blue('<blueprintPath>')}`,
        desc: chalk_1.default.white('Adds a new blueprint'),
        builder: (yargs) => {
            return yargs
                .positional('blueprintPath', {
                describe: `The path to the blueprint (can be a resolver - see http://${websiteUrl}/docs/resolvers)`,
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
                return (0, add_1.default)({ config, modulePath: argv.blueprintPath });
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
