const chalk = require('chalk')

module.exports = skip = type => console.log(chalk.blue(`Skipping generation of ${type} due to user selection`))