const fs = require('fs')
const path = require('path')
const throwError = require('./throw-error')
const returnMessage = require('./return-message')

module.exports = generateDirectory = (name, dir, force) => {
    const output = dir ? path.join(dir, name.trim()) : name
    if (!fs.existsSync(output)) {
      try {
        fs.mkdirSync(output)
      } catch (err) {
        throwError(`'${name.split('/')[0]}' is not writable or does not exist`)
      }
    } else {
      if (!force) {
        throwError(`${output} already exists, aborting`)
      } else {
        returnMessage(`Ignoring existance of existing ${output} folder with --force`, {color: 'orange'})
      }
    }
  }