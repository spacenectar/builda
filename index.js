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
    type: 'input',
    name: 'createDirectories',
    message: 'If you want extra directories, type them here separated by commas. If not, leave it blank',
    default: ''
  }
]

// Ask the user the predefined questions
var questionTime = function () {
  console.log(chalk.yellow('Please answer the following:\n\n'))
  inquirer.prompt(questions).then(function (answers) {
    fileGen(answers)
  })
}


const generateFile = (name, k, s) => {
  // Generates the files
  const src = fs.readFileSync(`./scaffold/${name}`, 'utf8')
              .replace(/%ComponentExample%/g, s)
  fs.writeFile(path.join(k, name), src, err => {
    err && console.error(err)
  })
}

var fileGen = function (answers) {
  const {componentName, useTS, createStyleSheet, createDirectories} = answers
  console.log(chalk.blue('\n\nCreating folders for', componentName, 'component'))
  var componentNameSentenceCase = _.upperFirst(_.camelCase(componentName))
  var componentNameKebab = _.kebabCase(componentName)

  
  // Create the directory
  if (!fs.existsSync(componentNameKebab)) {
    try {
      fs.mkdirSync(componentNameKebab)
    } catch (exception) {
      console.error(exception)
    }
  }
  
  // Generate the index file
  generateFile('index.tsx', componentNameKebab, componentNameSentenceCase)
  

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
