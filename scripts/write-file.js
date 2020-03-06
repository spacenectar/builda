const fs = require('fs')
const path = require('path')

module.exports = writeFile = (dir, name, data) => {
  fs.writeFileSync(path.join(dir, name), data)
}