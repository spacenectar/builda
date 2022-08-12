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
    message:
      'Choose an output directory relative to your current working directory',
    default: './src'
  },
  {
    type: 'list',
    name: 'installDefaultModule',
    message:
      'Which scaffold module do you want to install? (this can be changed later)',
    choices: [
      {
        name: 'Default React (typescript)',
        value: 'typescript'
      },
      {
        name: 'Default React (javascript)',
        value: 'javascript'
      },
      {
        name: 'Custom module',
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
    when: (answers: { installDefaultModule: string }) =>
      answers.installDefaultModule === 'custom'
  },
  {
    type: 'checkbox',
    name: 'scaffoldSelection',
    message: 'Select zero or more scaffold types you wish to use',
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
    when: (answers: { customScaffold: boolean }) => answers.customScaffold
  }
];
