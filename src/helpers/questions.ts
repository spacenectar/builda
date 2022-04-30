export default [
  {
    type: 'input',
    name: 'outputDirectory',
    message:
      'Choose an output directory relative to your current working directory',
    default: './src/components'
  },
  {
    type: 'confirm',
    name: 'useTS',
    message: 'Do you want to generate TypeScript files?',
    default: true
  },
  {
    type: 'list',
    name: 'useTSInline',
    message:
      'Would you prefer to have your types in a separate file or have them inline with the component file?',
    choices: ['Inline', 'Separate'],
    when: (answers: { useTS: boolean }) => answers.useTS,
    default: false
  },
  {
    type: 'confirm',
    name: 'createStyleSheet',
    message: 'Do you want to generate Stylesheets?',
    default: true
  },
  {
    type: 'list',
    name: 'chooseStyleSheet',
    message: 'What type of Stylesheet do you want to generate?',
    choices: ['CSS', 'SCSS', 'SASS'],
    when: (answers: { createStyleSheet: string }) => answers.createStyleSheet,
    default: 'CSS'
  },
  {
    type: 'confirm',
    name: 'useModules',
    message: 'Do you want to use CSS Modules?',
    when: (answers: { createStyleSheet: boolean }) => answers.createStyleSheet,
    default: false
  },
  {
    type: 'confirm',
    name: 'createStories',
    message: 'Do you want to generate Storybook stories?',
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
    name: 'createTests',
    message:
      'Do you want to create a test file (pre-populated with a snapshot test)?',
    default: true
  },
  {
    type: 'list',
    name: 'testType',
    message:
      "Do you want to generate 'spec' or 'test' files? (e.g. example.spec.js/ts or example.test.js/ts)",
    choices: ['test', 'spec'],
    when: (answers: { createTests: string }) => answers.createTests,
    default: 'test'
  },
  {
    type: 'input',
    name: 'createDirectories',
    message:
      'If you want extra directories to be created with each component, type them here separated by commas. If not, leave it blank',
    default: ''
  },
  {
    type: 'confirm',
    name: 'createReadme',
    message:
      'Do you want to generate a basic README.md file for each component? (Not needed for Storybook MDX but recommended for CSF) ',
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
