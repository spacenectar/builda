"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = __importDefault(require("./configure"));
exports.default = () => {
    return {
        command: 'project [appName]',
        desc: 'Generate a new app from a prefab',
        aliases: ['app', '--app', '--project'],
        builder: (yargs) => {
            return yargs
                .positional('appName', {
                describe: 'The name of the app',
                type: 'string',
                default: ''
            })
                .option('prefab', {
                alias: 'p',
                default: '',
                describe: 'The prefab to use (url, local path, or preset name)',
                type: 'string'
            })
                .option('smokeTest', {
                alias: 's',
                default: false,
                describe: 'Runs the command but deletes the output immediately',
                type: 'boolean'
            });
        },
        handler: async (argv) => {
            const args = {
                appName: argv.appName,
                prefab: argv.prefab,
                smokeTest: argv.smokeTest
            };
            await (0, configure_1.default)(Object.assign({}, args));
        }
    };
};
