const fs = require('fs')
const path = require('path')

module.exports = writeFile = (c, n, o) => {
  fs.writeFileSync(path.join(c, n), o)
}