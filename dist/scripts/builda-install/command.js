"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const install_1 = __importDefault(require("./install"));
exports.default = () => {
    return {
        command: 'install <modulePath>',
        desc: 'Adds a new blueprint',
        builder: (yargs) => {
            return yargs.option('configPath', {
                aliases: ['c', 'config'],
                default: '',
                describe: 'The path to a config file',
                type: 'string'
            });
        },
        handler: async () => {
            return (0, install_1.default)();
        }
    };
};
