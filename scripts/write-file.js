const fs = require('fs')
const path = require('path')
const throwError = require('./throw-error')

module.exports =  writeFile = (c, n, o) => {
    fs.writeFile(path.join(c, n), o, err => {
      err && throwError(err)
    })
  }