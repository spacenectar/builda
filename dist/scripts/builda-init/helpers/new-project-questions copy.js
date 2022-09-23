"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../../helpers");
const show_help_1 = __importDefault(require("./show-help"));
exports.default = async () => {
    return inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: chalk_1.default.red(`What do you want to call your project?`),
            default: (0, helpers_1.randomWordGenerator)()
        },
        {
            type: 'input',
            name: 'appRoot',
            message: () => {
                (0, show_help_1.default)("The app root is the directory where your app files are stored.\nThis is usually your current working directory but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\nIf you're not sure, just press enter to use the current working directory.");
                return 'What is the root directory of your app?';
            },
            default: './'
        },
        {
            type: 'list',
            name: 'packageManager',
            message: () => {
                (0, show_help_1.default)('Builda works with both npm and yarn. If you are not sure, just press enter to use npm.');
                return 'Which package manager do you want to use?';
            },
            choices: ['npm', 'yarn'],
            default: 'npm'
        }
    ]);
};
