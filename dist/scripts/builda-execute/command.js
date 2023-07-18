"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execute_1 = __importDefault(require("./execute"));
exports.default = () => {
    return {
        command: 'execute <command>',
        desc: 'Execute a command from within the export directory',
        aliases: ['x', 'exec'],
        builder: (yargs) => {
            return yargs.positional('command', {
                describe: 'The name of the command',
                type: 'string',
                demandOption: true
            });
        },
        handler: async (argv) => {
            return (0, execute_1.default)({ command: argv.command, args: argv });
        }
    };
};
