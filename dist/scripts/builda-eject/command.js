"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eject_1 = __importDefault(require("./eject"));
exports.default = () => {
    return {
        command: 'eject <pathString>',
        desc: 'Eject a file or directory from builda to make it editable',
        builder: (yargs) => {
            return yargs
                .positional('pathString', {
                describe: 'The path to the file or directory to eject',
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
            return (0, eject_1.default)({ pathString: argv.pathString });
        }
    };
};
