#! /usr/bin/env node
const arguments = require('./data/arguments')

const questionTime = require('./scripts/question-time')
const argumentMode = require('./scripts/argument-mode')
const returnMessage = require('./scripts/return-message')
const comGen = require('./scripts/component-generator')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options(arguments)
  .help('h')
  .alias('h', 'help')
  .argv

const args = process.argv.slice(2)
  
returnMessage('=============================================', {color: 'magenta'})
returnMessage('BuildCom_\r', { color: 'magenta'})
returnMessage(`Component builder`, { color: 'white'})
returnMessage('=============================================\n', {color: 'magenta'})


if (args.length === 0 ) {
  questionTime().then(answers => comGen(answers))
} else {
  comGen(argumentMode(argv))
}
