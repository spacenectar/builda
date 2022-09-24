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
    (0, show_help_1.default)("This section is all about adding blueprints to your project.\nIf you're not sure what a blueprint is, visit " +
        chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('docs/blueprints')) +
        chalk_1.default.white(' for more information.'));
    return inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'addBlueprints',
            message: `Do you want to add any blueprints?`,
            default: true
        },
        {
            type: 'list',
            name: 'blueprintChoice',
            message: 'Do you have a blueprint url or do you want to choose from a list?',
            choices: [
                {
                    name: 'I have a url',
                    value: 'url'
                },
                {
                    name: 'I want to choose from a list',
                    value: 'list'
                }
            ]
        },
        {
            type: 'input',
            name: 'blueprintUrl',
            message: 'Enter the blueprint url:',
            when: (answers) => answers.blueprintChoice === 'url'
        },
        {
            type: 'list',
            name: 'blueprintList',
            message: 'Choose a blueprint:',
            choices: [
                {
                    name: 'Fake blueprint',
                    value: ''
                },
                {
                    name: 'Another fake blueprint',
                    value: ''
                },
                {
                    name: 'Yet another fake blueprint',
                    value: ''
                }
            ],
            when: (answers) => answers.blueprintChoice === 'list'
        }
    ]);
};
