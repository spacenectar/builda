const chalk = require('chalk')

module.exports = returnMessage = (message, type) => {
    if (type && type === 'error') {
      console.log(chalk.keyword('red')(`🚨 ${message}`))
      return process.exit(1);
    }

    if (type && type === 'warning') {
      return console.log(chalk.keyword('orange')(`⚠️ ${message}`))
    }

    if (type && type === 'notice') {
      return console.log(chalk.keyword('blue')(message))
    }

    if (type && type === 'success') {
      return console.log(chalk.keyword('green')(`${message}`))
    }

    if (!type) {
      return console.log(message)
    }

}
