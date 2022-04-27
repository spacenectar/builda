"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
// import path from 'path';
const _helpers_1 = require("../../helpers/index.js");
const configFileMode_1 = __importDefault(require("./configFileMode"));
const args = process.argv.slice(2);
const config = (0, configFileMode_1.default)();
exports.default = async () => {
    if (args.length === 0) {
        // No arguments were passed
        if (config) {
            // The config file exists
            (0, _helpers_1.printMessage)('🚀 .buildcomrc file detected.\r', 'success');
            // Ask user what they want to call their component
            (0, _helpers_1.askQuestion)({
                message: 'What would you like to name your component?',
                name: 'componentName'
            }).then(({ componentName }) => {
                // TODO: We have a complete component config now, send user to the generator function
                console.log('created componenent called ', componentName);
            });
        }
        else {
            // The config file does not exist
            (0, _helpers_1.printMessage)('No arguments were passed and no .buildcomrc file was found.\r', 'warning');
            (0, _helpers_1.askQuestion)({
                message: 'Would you like to create a .buildcomrc file?',
                name: 'createConfig',
                type: 'confirm'
            }).then(({ createConfig }) => {
                createConfig
                    ? console.log('created file') // TODO: Send user to init function
                    : (0, _helpers_1.printMessage)('Process terminated due to user selection', 'error');
                process.exit(1);
            });
        }
    }
    else {
        // TODO: Send user to argument function
        (0, _helpers_1.printMessage)('Arguments were passed', 'success');
    }
};
