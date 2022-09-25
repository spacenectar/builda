"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("helpers");
const suggested_prefabs_json_1 = __importDefault(require("data/suggested-prefabs.json"));
exports.default = async (answers) => {
    (0, helpers_1.showHelp)("These questions are all about building a project from a prefab.\n\nIf you're not sure what a prefab is, visit " +
        chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('docs/prefabs')) +
        chalk_1.default.white(' for more information.'));
    return inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'prefabChoice',
            message: 'Do you have a prefab url or do you want to choose from a list?',
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
            name: 'prefabUrl',
            message: () => {
                (0, helpers_1.showHelp)('The url should point to the folder that the prefabs registry.json file is in. It can be a regular link or use a resolver.' +
                    (0, helpers_1.printSiteLink)({ link: 'docs/resolvers' }));
                return 'Enter the prefab url:';
            },
            when: (answers) => answers.prefabChoice === 'url',
            validate: async (input) => {
                if (!input) {
                    return 'You must enter a url';
                }
                // Check that a registry.json file exists at the url
                return (0, helpers_1.validateModulePath)(input, answers);
            }
        },
        {
            type: 'list',
            name: 'prefabList',
            message: () => {
                (0, helpers_1.showHelp)('This list is not exhaustive. You can find more prefabs at ' +
                    chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('tradeStore/prefabs')));
                return 'Choose a prefab:';
            },
            choices: suggested_prefabs_json_1.default,
            when: (answers) => answers.prefabChoice === 'list'
        }
    ]);
};
