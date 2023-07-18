"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __importDefault(require("../../data/globals"));
const add_1 = __importDefault(require("./add"));
const { websiteUrl } = globals_1.default;
exports.default = () => {
    return {
        command: 'add <blueprintPath>',
        desc: 'Adds a new blueprint',
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
            return (0, add_1.default)({ modulePath: argv.blueprintPath });
        }
    };
};
