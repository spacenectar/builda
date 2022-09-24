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
    (0, show_help_1.default)('This is a guided setup process to initialise a project.\nIf you get stuck, visit ' +
        chalk_1.default.blue.underline((0, helpers_1.getSiteLink)('docs/init')) +
        chalk_1.default.white(' for more information.\nYou can exit the process at any time by pressing Ctrl+C.'));
    if (config) {
        if (config.prefab) {
            (0, show_help_1.default)('This project was generated from a prefab and cannot be reinitialised.', 'error');
            process.exit(1);
        }
        (0, show_help_1.default)('It looks like builda has already been initialised in this project.\nYou can overwrite the existing config if you want to start again.\n' +
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
    const { projectType } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'projectType',
            message: 'Is this a new project or are you adding Builda to an existing project?',
            choices: [
                {
                    name: 'New project',
                    value: 'new'
                },
                {
                    name: 'Existing project',
                    value: 'existing'
                }
            ]
        }
    ]);
    if (projectType === 'new') {
        (0, show_help_1.default)("A fresh start! Let's get you set up with a new project.\n\n" +
            'You can choose to use a prefab to get started quickly, or you can set up a project from scratch.');
        const prefabAnswers = await (0, prefab_questions_1.default)(answers);
        if (prefabAnswers.usePrefab) {
            answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
        }
        else {
            (0, show_help_1.default)('You can set up a project from scratch by answering a few questions about your project.\n' +
                `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`);
        }
        const newProjectAnswers = await (0, new_project_questions_1.default)();
        answers = Object.assign(Object.assign({}, answers), newProjectAnswers);
    }
    else {
        (0, show_help_1.default)('You can add builda to an existing project by answering a few questions about your project.\n' +
            `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`);
        const existingProjectAnswers = await (0, existing_project_questions_1.default)();
        answers = Object.assign(Object.assign({}, answers), existingProjectAnswers);
    }
    const blueprintAnswers = await (0, blueprint_questions_1.default)(answers);
    answers = Object.assign(Object.assign({}, answers), blueprintAnswers);
    console.log(answers);
};
