"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../../helpers");
const show_help_1 = __importDefault(require("./show-help"));
const helpers_2 = require("../../../helpers");
exports.default = async (answers) => {
    (0, show_help_1.default)("This section is all about building a project from a prefab.\nIf you're not sure what a prefab is, visit " +
        chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('docs/prefabs')) +
        chalk_1.default.white(' for more information.'));
    return inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'usePrefab',
            message: `Do you want to set the project up using a prefab?`,
            default: true
        },
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
                (0, show_help_1.default)('The url should point to the folder that the prefabs registry.json file is in.\nIt can be a regular link or use a resolver\n. See' +
                    chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('docs/resolvers')));
                return 'Enter the prefab url:';
            },
            when: (answers) => answers.prefabChoice === 'url',
            validate: async (input) => {
                if (!input) {
                    return 'You must enter a url';
                }
                // Check that a registry.json file exists at the url
                return (0, helpers_2.validateModulePath)(input, answers);
            }
        },
        {
            type: 'list',
            name: 'prefabList',
            message: () => {
                (0, show_help_1.default)('This list is not exhaustive. You can find more prefabs at ' +
                    chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('tradeStore/prefabs')));
                return 'Choose a prefab:';
            },
            choices: [
                {
                    name: 'Test Prefab',
                    value: 'github:builda-modules/prefab-test'
                },
                {
                    name: 'Fake prefab',
                    value: ''
                },
                {
                    name: 'Another fake prefab',
                    value: ''
                },
                {
                    name: 'Yet another fake prefab',
                    value: ''
                }
            ],
            when: (answers) => answers.prefabChoice === 'list'
        }
    ]);
};
