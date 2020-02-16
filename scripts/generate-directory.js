const fs = require('fs')
const path = require('path')
const throwError = require('./throw-error')

module.exports = generateDirectory = (name, dir) => {
    const output = dir ? path.join(dir, name.trim()) : name
    if (!fs.existsSync(output)) {
      try {
        fs.mkdirSync(output)
      } catch (err) {
        throwError(`'${name.split('/')[0]}' is not writable or does not exist`)
      }
    } 
  }