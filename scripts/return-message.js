const chalk = require('chalk')

module.exports = returnMessage = (message, formatting) => {
    const { color } = formatting
    console.log(chalk[color](message))
}