"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your app?',
        default: 'My App'
    },
    {
        type: 'input',
        name: 'outputDirectory',
        message: 'Where does your app live? (relative to the root of your project)',
        default: './'
    },
    {
        type: 'list',
        name: 'installDefaultModule',
        message: 'Which scaffold module do you want to install? (this can be changed later)',
        choices: [
            {
                name: 'Default React (typescript)',
                value: 'scaffold-default-ts'
            },
            {
                name: 'Default React (javascript)',
                value: 'scaffold-default-js'
            },
            {
                name: 'Custom scaffold',
                value: 'custom'
            }
        ],
        default: 'typescript'
    },
    {
        type: 'input',
        name: 'scaffoldUrl',
        message: 'What is the path to the custom scaffold module you want to use?',
        default: '',
        when: (answers) => answers.installDefaultModule === 'custom'
    },
    {
        type: 'checkbox',
        name: 'scaffoldSelection',
        message: 'Select one or more scaffold types you wish to use',
        validate: (answer) => {
            if (answer.length < 1) {
                return 'You must choose at least one scaffold type. See https://builda.io/docs/scaffold-types for more info.';
            }
            return true;
        },
        choices: [
            'component',
            'atom',
            'molecule',
            'organism',
            'partial',
            'page',
            'template'
        ]
    },
    {
        type: 'confirm',
        name: 'customScaffold',
        message: 'Would you like to add your own custom scaffold types?',
        default: false
    },
    {
        type: 'input',
        name: 'customScaffoldList',
        message: 'Add your custom scaffold types (separated by commas)',
        default: '',
        when: (answers) => answers.customScaffold
    }
];
