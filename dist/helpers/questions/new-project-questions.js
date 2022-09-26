"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
exports.default = async (hasPrefab) => {
    const suggestedName = (0, helpers_1.randomNameGenerator)();
    if (hasPrefab) {
        (0, helpers_1.showHelp)('Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.', 'success');
    }
    return inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'projectName',
            required: true,
            message: `What do you want to call your project? (If you don't know, just press enter to use ${chalk_1.default.bold.magenta(suggestedName)})`,
            default: suggestedName
        },
        {
            type: 'input',
            name: 'appRoot',
            message: () => {
                (0, helpers_1.showHelp)("The app root is the directory where your app files are stored.\n\nThis is usually your current working directory but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\n\nIf you're not sure, just press enter to use the current working directory.");
                return 'What is the root directory of your app?';
            },
            default: './'
        },
        {
            type: 'list',
            name: 'packageManager',
            message: () => {
                (0, helpers_1.showHelp)('Builda works with both npm and yarn. If you are not sure, just press enter to use npm.');
                return 'Which package manager do you want to use?';
            },
            choices: ['npm', 'yarn'],
            default: 'npm'
        }
    ]);
};
