const chalk = require('chalk')

module.exports = throwError = msg => {
    throw new Error(msg)
}