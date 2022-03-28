const returnMessage = require('./return-message')

module.exports = skip = type => returnMessage(`Skipping generation of ${type} due to user selection`, 'notice')
