const chalk = require('chalk')

module.exports = throwError = msg => {
    console.error(chalk.red.bold('Fatal error:'), msg)
    process.exit(1)
  }