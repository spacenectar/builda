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
