"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_project_1 = __importDefault(require("./generate-project"));
exports.default = () => {
    return {
        cmd: 'app [appName]',
        desc: 'Generate a new app from a prefab',
        builder: (yargs) => {
            return yargs
                .positional('appName', {
                describe: 'The name of the app',
                type: 'string'
            })
                .option('pathName', {
                alias: 'p',
                default: '',
                describe: 'The path to the app',
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
            });
        },
        handler: async (argv) => {
            const args = {
                appName: argv.appName || argv.name,
                pathName: argv.path,
                packageManager: argv.packageManager,
                autoInstall: argv.autoInstall
            };
            await (0, generate_project_1.default)(Object.assign({}, args));
        }
    };
};