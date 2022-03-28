const fs = require('fs')
const path = require('path')
const returnMessage = require('./return-message')

const makeDir = (dir, name) => {
  try {
    fs.mkdirSync(dir)
  } catch (err) {
    returnMessage(`'${name.split('/')[0]}' is not writable or does not exist`, 'error')
  }
}

module.exports = generateDirectory = ({
  name,
  dir,
  checkExists,
  force
}) => {
    const output = dir ? path.join(dir, name.trim()) : name
    if (checkExists) {
      if (!fs.existsSync(output)) {
        makeDir(output, name)
      } else {
        if (!force) {
          returnMessage(`${output} already exists, aborting entire process, please run the command again`, 'error')
        } else {
          returnMessage(`Ignoring existance of existing ${output} folder with --force`, 'warning')
        }
      }
    } else {
      makeDir(output, name)
    }
}
