import { Answers } from 'inquirer';

export default [
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
    message:
      'Which blueprint module do you want to install? (this can be changed later)',
    choices: [
      {
        name: 'Default React (typescript)',
        value: 'builda:blueprint-default-ts'
      },
      {
        name: 'Default React (javascript)',
        value: 'builda:blueprint-default-js'
      },
      {
        name: 'Custom blueprint',
        value: 'custom'
      }
    ],
    default: 'typescript',
    when: (answers: Answers) => answers.buildFromPrefab === false
  },
  {
    type: 'input',
    name: 'blueprintUrl',
    message: 'What is the path to the custom blueprint module you want to use?',
    default: '',
    when: (answers: Answers) => answers.installDefaultModule === 'custom'
  },
  {
    type: 'checkbox',
    name: 'blueprintSelection',
    message: 'Select one or more blueprint types you wish to use',
    validate: (answer: string[]) => {
      if (answer.length < 1) {
        return 'You must choose at least one blueprint type. See https://builda.io/docs/blueprint-types for more info.';
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
    name: 'customBlueprint',
    message: 'Would you like to add your own custom blueprint types?',
    default: false
  },
  {
    type: 'input',
    name: 'customBlueprintList',
    message: 'Add your custom blueprint types (separated by commas)',
    default: '',
    when: (answers: Answers) => answers.customBlueprint
  }
];
