"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = __importDefault(require("./package"));
exports.default = () => {
    return {
        command: 'package',
        desc: 'Package a module ready for publishing',
        aliases: ['package', 'pack'],
        builder: (yargs) => {
            return yargs.option('version', {
                aliases: ['v', 'ver'],
                default: '',
                describe: 'update module version (semver)',
                type: 'string'
            });
        },
        handler: async (argv) => {
            return (0, package_1.default)(argv.version);
        }
    };
};
