"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const suggested_blueprints_json_1 = __importDefault(require("../../data/suggested-blueprints.json"));
const validateBlueprint = async (input, answers) => {
    const moduleValid = await (0, helpers_1.validateModulePath)(input);
    if (moduleValid.status) {
        if (answers.prefabRegistry) {
            const registry = answers.prefabRegistry;
            const blueprints = registry.blueprints;
            if (blueprints && blueprints[input]) {
                return {
                    status: false,
                    message: 'A blueprint with that name already exists'
                };
            }
            return {
                status: true,
                message: ''
            };
        }
        return {
            status: true,
            message: ''
        };
    }
    return {
        status: false,
        message: moduleValid.message || 'Could not validate the blueprint'
    };
};
exports.default = async (answers) => {
    (0, helpers_1.showHelp)("These questions are all about adding blueprints to your project.\r\n\nIf you're not sure what a blueprint is" +
        (0, helpers_1.printSiteLink)({ link: 'docs/blueprints' }));
    return inquirer_1.default.prompt([
        {
            type: 'confirm',
            name: 'addBlueprints',
            message: () => {
                let blueprintList = [];
                const registry = answers.prefabRegistry;
                const blueprints = registry === null || registry === void 0 ? void 0 : registry.blueprints;
                if (answers.prefab && !!blueprints) {
                    blueprintList = Object.keys(blueprints);
                    (0, helpers_1.showHelp)(`You are generating this project from the ${chalk_1.default.blue(registry.name)} prefab.\n\nIt comes with the following blueprints:\n\n\t` +
                        blueprintList
                            .map((blueprint) => chalk_1.default.blue(blueprint))
                            .join('\n\t') +
                        '\n\nEnsure that any additional blueprints you add are compatible with this prefab.', 'warning');
                }
                return `Do you want to add any${blueprintList.length ? 'additional' : ''} blueprints to your project?`;
            },
            default: true
        },
        {
            type: 'list',
            name: 'blueprintChoice',
            message: 'Do you have url(s) for your blueprint(s) or do you want to choose from a list?',
            choices: [
                {
                    name: 'I have url(s)',
                    value: 'url'
                },
                {
                    name: 'I want to choose from a list (coming soon)',
                    value: 'list',
                    disabled: 'This option is not available yet'
                }
            ]
        },
        {
            type: 'input',
            name: 'blueprintUrls',
            message: 'Enter the blueprint url(s) (if adding more than one, please separate them with a space):',
            when: (answers) => answers.blueprintChoice === 'url',
            validate: async (input) => {
                if (!input) {
                    return 'You must enter at least one url';
                }
                const urls = input.split(' ');
                for (const url of urls) {
                    // Check that the blueprints are valid and don't already exist
                    const moduleValid = await validateBlueprint(url, answers);
                    if (!moduleValid.status) {
                        return `The module at ${url} returned an error: ${moduleValid.message}`;
                    }
                }
                return true;
            }
        },
        {
            type: 'checkbox',
            name: 'blueprintList',
            message: () => {
                (0, helpers_1.showHelp)('This list is not exhaustive. You can find more blueprints at ' +
                    chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('tradeStore/blueprints')));
                return 'Choose your blueprints:';
            },
            choices: suggested_blueprints_json_1.default,
            when: (answers) => answers.blueprintChoice === 'list',
            validate: async (input) => {
                if (!input.length) {
                    return 'You must choose at least one blueprint';
                }
                // Check that the blueprint is valid and doesn't already exist
                for (const blueprint of input) {
                    const moduleValid = await validateBlueprint(blueprint, answers);
                    if (!moduleValid.status) {
                        return `The module at ${blueprint} returned an error: ${moduleValid.message}`;
                    }
                }
                return true;
            }
        }
    ]);
};
