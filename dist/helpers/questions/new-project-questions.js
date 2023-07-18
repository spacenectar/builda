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
            name: 'appName',
            required: true,
            message: `What do you want to call your project? This will also be the folder name we will create for your app. (If you don't know, just press enter to use ${chalk_1.default.bold.magenta(suggestedName)})`,
            default: suggestedName
        }
    ]);
};
