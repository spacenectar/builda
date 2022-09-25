"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
const show_help_1 = __importDefault(require("./helpers/show-help"));
const existing_project_questions_1 = __importDefault(require("./helpers/existing-project-questions"));
const new_project_questions_1 = __importDefault(require("./helpers/new-project-questions"));
const prefab_questions_1 = __importDefault(require("./helpers/prefab-questions"));
const blueprint_questions_1 = __importDefault(require("./helpers/blueprint-questions"));
// Starts a guided setup process to initialise a project
exports.default = async ({ config }) => {
    const { buildaDir, configFileName } = globals_1.default;
    let answers = {
        projectName: '',
        appRoot: '',
        packageManager: ''
    };
    if (config) {
        if (config.prefab) {
            (0, show_help_1.default)('This project was generated from a prefab and cannot be reinitialised. If you meant to run "builda install" instead, press Y to continue, or the "N" or "enter" key to exit.', 'error');
            const { installInstead } = await inquirer_1.default.prompt([
                {
                    type: 'confirm',
                    name: 'installInstead',
                    message: 'Run install instead?',
                    default: false
                }
            ]);
            if (installInstead) {
                return console.log('Running install instead...');
            }
            process.exit(1);
        }
        (0, show_help_1.default)('It looks like builda has already been initialised in this project.\nYou can overwrite the existing config if you want to start again.\r\n\n' +
            chalk_1.default.yellow('Be careful though') +
            ', this will delete any existing config file and your' +
            buildaDir +
            ' directory.', 'warning');
        // If a config file already exists, ask the user if they want to overwrite it
        const { overwrite } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: chalk_1.default.red(`Are you sure you want to reset the builda config?`),
                default: false
            }
        ]);
        if (!overwrite) {
            // If the user doesn't want to overwrite the config file, exit the script
            (0, helpers_1.printMessage)('Process aborted at user request', 'notice');
            process.exit(0);
        }
        // If the user wants to overwrite the config file, delete the existing one
        node_fs_1.default.unlinkSync(configFileName);
        // And delete the builda directory
        if (node_fs_1.default.existsSync(buildaDir)) {
            node_fs_1.default.rmdirSync(buildaDir, { recursive: true });
        }
    }
    (0, show_help_1.default)('Welcome to ' +
        chalk_1.default.magenta('Builda') +
        ' This is a guided setup process help you get your project up and running.' +
        (0, helpers_1.printSiteLink)({
            link: 'docs/init',
            endText: 'if you get stuck.\n\n'
        }) +
        chalk_1.default.white('You can exit the process at any time by pressing Ctrl+C.'), 'builda');
    // Ask the user what they want to do
    const { initType } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'initType',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'I want to start a new project',
                    value: 'new'
                },
                {
                    name: 'I want to use blueprints in an existing project',
                    value: 'existing'
                },
                {
                    name: 'I want to creae my own prefab',
                    value: 'prefab'
                },
                {
                    name: 'I want to create my own blueprint',
                    value: 'blueprint'
                }
            ]
        }
    ]);
    if (initType === 'new') {
        (0, show_help_1.default)("A fresh start! Let's get you set up with a new project.\r\n\nYou can choose to use a prefab to get started quickly, or you can set up a project from scratch.");
        const { usePrefab } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'usePrefab',
                message: `Do you want to set the project up using a prefab?`,
                default: true
            }
        ]);
        if (usePrefab) {
            const prefabAnswers = await (0, prefab_questions_1.default)(answers);
            answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
        }
        else {
            (0, show_help_1.default)('You can set up a project from scratch by answering a few questions about your project.\r\n\n' +
                `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`);
        }
        if (answers.prefab) {
            (0, show_help_1.default)('Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.', 'success');
        }
        const newProjectAnswers = await (0, new_project_questions_1.default)();
        answers = Object.assign(Object.assign({}, answers), newProjectAnswers);
    }
    if (initType === 'existing') {
        (0, show_help_1.default)('You can add builda to an existing project by answering a few questions about your project.\r\n\n' +
            `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`);
        const existingProjectAnswers = await (0, existing_project_questions_1.default)();
        answers = Object.assign(Object.assign({}, answers), existingProjectAnswers);
    }
    if (initType === 'new' || initType === 'existing') {
        const blueprintAnswers = await (0, blueprint_questions_1.default)(answers);
        answers = Object.assign(Object.assign({}, answers), blueprintAnswers);
    }
    if (initType === 'prefab') {
        (0, show_help_1.default)('You can create your own prefab by answering a few questions about your project.\r\n\n' +
            `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.` +
            (0, helpers_1.printSiteLink)({ link: 'docs/build-a-module', anchor: 'prefab' }));
    }
    if (initType === 'blueprint') {
        (0, show_help_1.default)('You can create your own blueprint by answering a few questions about your project.\r\n\n' +
            `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.\r\n\n` +
            (0, helpers_1.printSiteLink)({ link: 'docs/build-a-module', anchor: 'blueprint' }));
    }
    console.log(answers);
};
