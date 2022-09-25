"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../../helpers");
const show_help_1 = __importDefault(require("./show-help"));
const validateBlueprint = async (input, answers) => {
    const moduleValid = await (0, helpers_1.validateModulePath)(input, answers);
    if (moduleValid === true) {
        if (answers.prefabRegistry) {
            const { blueprints } = answers.prefabRegistry;
            if (blueprints && blueprints[input]) {
                return 'A blueprint with that name already exists';
            }
            return true;
        }
        return 'No prefab registry found - this was an unexpected error';
    }
    return moduleValid;
};
exports.default = async (answers) => {
    (0, show_help_1.default)("This section is all about adding blueprints to your project.\r\n\nIf you're not sure what a blueprint is" +
        (0, helpers_1.printSiteLink)({ link: 'docs/blueprints' }));
    return inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'addBlueprints',
            message: () => {
                var _a, _b;
                let blueprintList = [];
                if (answers.prefab && !!((_a = answers.prefabRegistry) === null || _a === void 0 ? void 0 : _a.blueprints)) {
                    blueprintList = Object.keys(answers.prefabRegistry.blueprints);
                    (0, show_help_1.default)(`You are generating this project from the ${chalk_1.default.blue((_b = answers.prefabRegistry) === null || _b === void 0 ? void 0 : _b.name)} prefab.\n\nIt comes with the following blueprints:\n\n\t` +
                        blueprintList
                            .map((blueprint) => chalk_1.default.blue(blueprint))
                            .join('\n\t') +
                        '\n\nEnsure that any additional blueprints you add are compatible with this prefab.', 'warning');
                }
                return `Do you want to add any ${blueprintList.length ? 'additional' : ''} blueprints to your project?`;
            },
            default: true
        },
        {
            type: 'list',
            name: 'blueprintChoice',
            message: 'Do you have urls for your blueprint(s) or do you want to choose from a list?',
            choices: [
                {
                    name: 'I have urls',
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
            when: (answers) => answers.blueprintChoice === 'url',
            validate: async (input) => {
                // Check that the blueprint is valid and doesn't already exist
                return validateBlueprint(input, answers);
            }
        },
        {
            type: 'checkbox',
            name: 'blueprintList',
            message: () => {
                (0, show_help_1.default)('This list is not exhaustive. You can find more blueprints at ' +
                    chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('tradeStore/blueprints')));
                return 'Choose a blueprint:';
            },
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
            when: (answers) => answers.blueprintChoice === 'list',
            validate: (input) => {
                // Check that the blueprint is valid and doesn't already exist
                return validateBlueprint(input, answers);
            }
        }
    ]);
};
