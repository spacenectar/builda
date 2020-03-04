const directoryRegex = RegExp(/^([A-Za-z0-9-_. ])+$/)

module.exports = [
    {
      type: 'input',
      name: 'componentName',
      message: 'What is your component called?',
      default: 'My New Component',
      validate: value => 
      directoryRegex.test(value) ? true : 'Component name is invalid'
    },
    {
      type: 'input',
      name: 'outputDirectory',
      message: 'Choose an output directory relative to your current working directory',
      default: '.',
      validate: value => 
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
      name: 'createStyleSheet',
      message: 'Do you want to add a Stylesheet?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useModules',
      message: 'Do you want to use CSS Modules?',
      when: answers => answers.createStyleSheet,
      default: false
    },
    {
      type: 'list',
      name: 'chooseStyleSheet',
      message: 'What type of Stylesheet do you want to generate?',
      choices: ['CSS', 'SCSS', 'SASS', 'LESS', 'Stylus'],
      when: answers => answers.createStyleSheet,
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
      choices: ['CSF', 'MDX' ],
      when: answers => answers.createStories,
      default: 'CSF'
    },
    {
      type: 'confirm',
      name: 'createSpec',
      message: 'Do you want to include Jest tests?',
      default: true
    },
    {
      type: 'input',
      name: 'createDirectories',
      message: 'If you want extra directories, type them here separated by commas. If not, leave it blank',
      default: ''
    },
    {
      type: 'confirm',
      name: 'createReadme',
      message: 'Do you want to generate a basic README.md file?',
      default: true
    }
  ]