const t = require('tap')

const returnMessage = require('../scripts/return-message')

t.test('returnMessage() Returns the expected console message', t => {
    t.matchSnapshot(returnMessage('The expected message', {color: 'blue'}), "The expected message")
    t.end()
})