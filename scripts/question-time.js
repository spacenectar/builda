const chalk = require('chalk')
const inquirer = require('inquirer')
const questions = require('../data/questions')

const comGen = require('./component-generator')

// Ask the user the predefined questions
module.exports = questionTime = () => {
    console.log(chalk.yellow('Please answer the following:\n\n'))
    inquirer.prompt(questions).then(answers => comGen(answers))
  }