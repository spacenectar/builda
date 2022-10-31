"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("./project"));
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
                .option('pathName', {
                alias: 'p',
                default: '',
                describe: 'The path to the prefab (url or local path)',
                type: 'string'
            })
                .option('packageManager', {
                alias: 'm',
                choices: ['npm', 'yarn'],
                default: 'npm',
                describe: 'The package manager to use',
                type: 'string'
            })
                .option('autoInstall', {
                alias: 'i',
                default: false,
                describe: 'Whether to automatically install dependencies',
                type: 'boolean'
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
                pathName: argv.pathName,
                packageManager: argv.packageManager,
                autoInstall: argv.autoInstall,
                smokeTest: argv.smokeTest
            };
            await (0, project_1.default)(Object.assign({}, args));
        }
    };
};
