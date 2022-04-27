import directoryRegex from '@helpers/directory-regex';

export default [
  {
    type: 'input',
    name: 'componentName',
    message: 'What is your component called?',
    default: 'My New Component',
    validate: (value: string) =>
      directoryRegex.test(value) ? true : 'Component name is invalid'
  },
  {
    type: 'input',
    name: 'outputDirectory',
    message:
      'Choose an output directory relative to your current working directory',
    default: '.',
    validate: (value: string) =>
      directoryRegex.test(value) ? true : 'That is not a valid directory'
  },
  {
    type: 'confirm',
    name: 'useTS',
    message: 'Do you want to use TypeScript?',
    default: true
  },
  {
    type: 'confirm',
    name: 'useTSInline',
    message: 'Use TypeScript inline? (default: false - creates a types folder)',
    when: (answers: { useTS: boolean }) => answers.useTS,
    default: false
  },
  {
    type: 'confirm',
    name: 'createStyleSheet',
    message: 'Do you want to add a Stylesheet?',
    default: true
  },
  {
    type: 'confirm',
    name: 'useModules',
    message: 'Do you want to use CSS Modules?',
    when: (answers: { createStyleSheet: boolean }) => answers.createStyleSheet,
    default: false
  },
  {
    type: 'list',
    name: 'chooseStyleSheet',
    message: 'What type of Stylesheet do you want to generate?',
    choices: ['CSS', 'SCSS', 'SASS', 'LESS', 'Stylus'],
    when: (answers: { createStyleSheet: string }) => answers.createStyleSheet,
    default: 'CSS'
  },
  {
    type: 'confirm',
    name: 'createStories',
    message: 'Do you want to include Storybook stories?',
    default: true
  },
  {
    type: 'list',
    name: 'chooseStorybook',
    message: 'What type of Storybook files do you want to generate?',
    choices: ['CSF', 'MDX'],
    when: (answers: { createStories: string }) => answers.createStories,
    default: 'CSF'
  },
  {
    type: 'confirm',
    name: 'createSpec',
    message:
      'Do you want to create a test file (pre-populated with a snapshot test)?',
    default: true
  },
  {
    type: 'list',
    name: 'createSpecType',
    message:
      "Do you want to generate 'spec' or 'test' files? (e.g. example.spec.js or example.test.js)",
    choices: ['test', 'spec'],
    when: (answers: { createSpec: string }) => answers.createSpec,
    default: 'test'
  },
  {
    type: 'input',
    name: 'createDirectories',
    message:
      'If you want extra directories, type them here separated by commas. If not, leave it blank',
    default: ''
  },
  {
    type: 'confirm',
    name: 'createReadme',
    message:
      'Do you want to generate a basic README.md file? (Not needed for Storybook MDX but recommended for CSF) ',
    default: true
  },
  {
    type: 'confirm',
    name: 'prepopulate',
    message:
      'Do you want to pre-populate the component with some example code?',
    default: true
  }
];
