const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const returnMessage = require('./return-message')


const makeDir = (dir, name) => {
  try {
    fs.mkdirSync(dir)
  } catch (err) {
    // returnMessage(`'${name.split('/')[0]}' is not writable or does not exist`, 'error')
    throw new Error(err)
  }
}

module.exports = generateDirectory = async ({
  name,
  dir,
  force
}) => {
  const output = dir ? path.resolve(dir, name.trim()) : name
  if (!fs.existsSync(output)) {
    makeDir(output, name)
  } else {
    if (force) {
      rimraf(output, () => {
        returnMessage(`Existing ${output} folder overwritten with --force. This can cause issues.`, 'warning')
        makeDir(output, name)
      })
    } else {
      returnMessage(`${output} already exists, aborting entire process, please run the command again`, 'error')
    }

  }
}
