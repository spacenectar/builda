const t = require('tap')

const throwError = require('../scripts/throw-error')

t.test('throwError() Returns the expected console message', async t => {
    t.throws(function() {
       throwError('Error message')
    }, new Error('Error message'), 'should throw an Error');
})