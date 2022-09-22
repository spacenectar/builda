"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const publish_1 = __importDefault(require("./publish"));
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
            return (0, publish_1.default)(argv.version);
        }
    };
};