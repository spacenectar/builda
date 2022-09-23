"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const publish_1 = __importDefault(require("./publish"));
exports.default = () => {
    return {
        command: chalk_1.default.green('publish'),
        desc: chalk_1.default.white('publish a module'),
        aliases: ['pub', 'push'],
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
