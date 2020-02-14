#! /usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

const questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'What is your component called?',
    default: 'My New Component',
    validate: function (value) {
      var pass = value.length > 0
      if (pass) return true
      return 'Component name cannot be empty'
    }
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
    default: false
  },
  {
    type: 'confirm',
    name: 'createStories',
    message: 'Do you want to include Storybook stories?',
    default: true
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
    default: false
  }
]

// Ask the user the predefined questions
var questionTime = function () {
  console.log(chalk.yellow('Please answer the following:\n\n'))
  inquirer.prompt(questions).then(function (answers) {
    fileGen(answers)
  })
}

var appDir = path.dirname(require.main.filename)


const generateFile = (name, k, s) => {
  // Generates the files and replaces any found strings
  const src = fs.readFileSync(`${appDir}/scaffold/${name}`, 'utf8')
              .replace(/%ComponentExample%/g, s)
              .replace(/%ComponentExampleKebab%/g, k)
              // A few extra bits need doing if it should be use in a sentence
              .replace(/%ComponentExampleSentence%/g, _.startCase(s))
  fs.writeFile(path.join(k, name), src, err => {
    err && console.error(err)
  })
}

const generateDirectory = (name, dir) => {
  const output = dir ? path.join(dir, name) : name
  if (!fs.existsSync(output)) {
    try {
      fs.mkdirSync(output)
    } catch (exception) {
      throw new Error(exception)
    }
  }
}

const skip = type => console.log(chalk.blue(`Skipping generation of ${type} due to user selection`))

var fileGen = function (answers) {
  const {
    componentName, 
    useTS, 
    createStyleSheet, 
    createDirectories, 
    createSpec, 
    createStories, 
    createReadme
  } = answers

  console.log(chalk.blue('\n\nCreating folders for', componentName, 'component'))
  
  var componentNameSentenceCase = _.upperFirst(_.camelCase(componentName))
  var componentNameKebab = _.kebabCase(componentName)

  var ext = useTS ? 'ts' : 'js'

  // Create the component directory
  generateDirectory(componentNameKebab)

  // Generate the index file
  generateFile(`index.${ext}x`, componentNameKebab, componentNameSentenceCase)

  // Generate the stories file
  createStories ? generateFile('index.stories.mdx', componentNameKebab, componentNameSentenceCase) : skip('story files')
  
  // Generate the sass file
  createStyleSheet ? generateFile('styles.module.scss', componentNameKebab, componentNameSentenceCase) : skip('stylesheets')
  
  // Generate the spec file
  createSpec ? generateFile(`index.spec.${ext}x`, componentNameKebab, componentNameSentenceCase) : skip('spec files')
  
  // Generate the readme file
  createReadme ? generateFile('README.md', componentNameKebab, componentNameSentenceCase) : skip('README file')
  
  const dirArray = createDirectories.split(',')

  dirArray.length 
    ? dirArray.map(dirName => generateDirectory(dirName, componentNameKebab))
    : skip('custom directories')

  // finish up
  setTimeout(function () {
    finishUp(componentName, answers)
  }, 500)
}

var finishUp = function (componentName, answers) {
  console.log(chalk.green('Component "', componentName, '" has been created'))
}



console.log(chalk.magenta('============================================='))
console.log(chalk.white(' React component builder (buildcom) '))
console.log(chalk.magenta('=============================================\n\n'))

questionTime()
