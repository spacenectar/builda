"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_events_1 = __importDefault(require("node:events"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
const existing_project_questions_1 = __importDefault(require("../../helpers/questions/existing-project-questions"));
const blueprint_questions_1 = __importDefault(require("../../helpers/questions/blueprint-questions"));
const builda_project_1 = require("../../scripts/builda-project");
const builda_add_1 = require("../../scripts/builda-add");
// Starts a guided setup process to initialise a project
exports.default = async ({ config }) => {
    // WORKAROUND: This is a workaround for a bug in inquirer that causes the
    // event listeners to not be removed until the process exits
    // This number should be incremented if the number of questions exceeds 50
    node_events_1.default.defaultMaxListeners = 50;
    const { buildaDir } = globals_1.default;
    let answers = {
        projectName: '',
        appRoot: '',
        packageManager: ''
    };
    /**
     * Config file exists, ask the user if they want to overwrite it or abort the process
     */
    if (config) {
        if (config.prefab) {
            (0, helpers_1.showHelp)('This project was generated from a prefab and cannot be reinitialised. If you meant to run "builda install" instead, press Y to continue, or the "N" or "enter" key to exit.', 'error');
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
        (0, helpers_1.showHelp)('It looks like builda has already been initialised in this project.\nYou can overwrite the existing config if you want to start again.\r\n\n' +
            chalk_1.default.yellow('Be careful though') +
            ', continuing will instantly delete any existing config and your' +
            buildaDir +
            ' directory.', 'warning');
        // If a builda config entry already exists in package.json, ask the user if they want to overwrite it
        const { overwrite } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'overwrite',
                message: chalk_1.default.red(`Are you sure you want to reset the builda config?`),
                default: false
            }
        ]);
        if (!overwrite) {
            // If the user doesn't want to overwrite the config , exit the script
            (0, helpers_1.printMessage)('Process aborted at user request', 'notice');
            process.exit(0);
        }
        // Remove the builda config from package.json
        (0, helpers_1.updateConfig)(null);
        // Delete the builda directory
        if (node_fs_1.default.existsSync(buildaDir)) {
            node_fs_1.default.rmSync(buildaDir, { recursive: true });
        }
    }
    /**
     * No config file exists, let's get this moveable feast underway!
     */
    (0, helpers_1.showHelp)('Welcome to ' +
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
                    name: 'I want to add builda to an existing project',
                    value: 'existing'
                },
                {
                    name: 'I want to create my own prefab',
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
        (0, helpers_1.showHelp)("A fresh start! Let's get you set up with a new project.\r\n\nYou can choose to use a prefab to get started quickly, or you can set up a project from scratch.");
        /**
         * Leave this command and go to the builda-project script
         */
        (0, builda_project_1.buildaProject)({});
    }
    if (initType === 'existing') {
        (0, helpers_1.showHelp)('You can add builda to an existing project by answering a few questions about your project.\r\n\n' +
            `If you are unsure about any of these, you can always change them later by editing the 'builda' entry in package.json.`);
        const existingProjectAnswers = await (0, existing_project_questions_1.default)();
        answers = Object.assign(Object.assign({}, answers), existingProjectAnswers);
        const blueprintAnswers = await (0, blueprint_questions_1.default)(answers);
        answers = Object.assign(Object.assign({}, answers), blueprintAnswers);
        const blueprints = answers.blueprintUrls ||
            answers.blueprintList.join('');
        (0, builda_add_1.buildaAdd)({ modulePath: blueprints });
    }
    if (initType === 'prefab') {
        (0, helpers_1.showHelp)('You can create your own prefab by answering a few questions about your project.\r\n\n' +
            `If you are unsure about any of these, you can always change them later by editing the 'builda' entry in package.json.` +
            (0, helpers_1.printSiteLink)({ link: 'docs/build-a-module', anchor: 'prefab' }));
        console.log('Coming soon...');
        process.exit(0);
    }
    if (initType === 'blueprint') {
        (0, helpers_1.showHelp)('You can create your own blueprint by answering a few questions about your project.\r\n\n' +
            `If you are unsure about any of these, you can always change them later by editing the 'builda' entry in package.json.\r\n\n` +
            (0, helpers_1.printSiteLink)({ link: 'docs/build-a-module', anchor: 'blueprint' }));
        console.log('Coming soon...');
        process.exit(0);
    }
};
