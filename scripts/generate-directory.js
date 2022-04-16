const fs = require('fs')
const path = require('path')
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
  dirs,
  force,
}) => {

  const rootDir = name.trim();

  if (dirs) {
    dirs.forEach(dir => {
      const dirPath = path.join(rootDir, dir)
      makeDir(dirPath, rootDir)
    })
  } else {
    if (fs.existsSync(rootDir)) {
      if (force) {
        returnMessage(`Existing ${name} folder overwritten with --force. I hope you know what you're doing!.`, 'warning')
        rootDir && fs.rmSync(rootDir, { recursive: true, force: true })
        return makeDir(rootDir, name)
      }
      returnMessage(`${name} already exists, aborting entire process, please run the command again`, 'error')
    }
    return makeDir(name)
  }
}
