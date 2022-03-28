#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer')
const yaml = require('js-yaml');

const arguments = require('./data/arguments')

const questionTime = require('./scripts/question-time')
const argumentMode = require('./scripts/argument-mode')
const configMode = require('./scripts/preconfigured-mode')
const returnMessage = require('./scripts/return-message')
const comGen = require('./scripts/component-generator')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options(arguments)
  .help('h')
  .alias('h', 'help')
  .argv

const args = process.argv.slice(2)

const directoryRegex = RegExp(/^([A-Za-z0-9-_. ])+$/)

returnMessage('=============================================', {color: 'magenta'})
returnMessage('BuildCom_\r', { color: 'magenta'})
returnMessage(`Component builder`, { color: 'white'})
returnMessage('=============================================\n', {color: 'magenta'})

if (fs.existsSync(path.join('.', '.buildcomrc'))) {
  returnMessage('🚀 .buildcomrc file detected.\r', 'success')
  const config = yaml.load(fs.readFileSync(path.join('.', '.buildcomrc'), 'utf8'));
  if (args.length === 0 ) {
    inquirer.prompt({
      type: 'input',
      name: 'componentName',
      message: 'What is your component called?',
      default: `Component C${Math.floor((Math.random() * 10000) + 1)}`,
      validate: value =>
        directoryRegex.test(value) ? true : 'Component name is invalid'
    }).then(answers => {
      return comGen(configMode(answers.componentName, config))
    })
  } else {
    argv._.forEach(arg => {
      comGen(configMode(arg, config))
    })
  }

} else {
  if (args.length === 0 ) {
    questionTime().then(answers => comGen(answers))
  } else {
    comGen(argumentMode(argv))
  }
}


