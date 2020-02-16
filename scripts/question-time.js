const inquirer = require('inquirer')
const questions = require('../data/questions')

// Ask the user the predefined questions
module.exports = questionTime = async () => await inquirer.prompt(questions)