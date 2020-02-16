#! /usr/bin/env node

const chalk = require('chalk')
const arguments = require('./data/arguments')

const questionTime = require('./scripts/question-time')
const argumentMode = require('./scripts/argument-mode')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options(arguments)
  .help('h')
  .alias('h', 'help')
  .argv

const args = process.argv.slice(2)
  
console.log(chalk.magenta('============================================='))
console.log(chalk.white(`${chalk.magenta('BuildCom_')} : Component builder`))
console.log(chalk.magenta('=============================================\n\n'))

if (args.length === 0 ) {
  questionTime() 
} else {
  argumentMode(argv)
}
