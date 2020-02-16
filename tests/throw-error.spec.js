const t = require('tap')

const throwError = require('../scripts/throw-error')

t.test('throwError() Throws the expected error', async t => {
    t.throws(function() {
       throwError('Error message')
    }, new Error('Error message'), 'should throw an Error');
})