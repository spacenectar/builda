const t = require('tap')

const generateDirectory = require('../scripts/generate-directory')

const dir = t.testdir()

t.test('Generates a directory called "test" in the testdir', t => {
    t.matchSnapshot(generateDirectory('test', dir))
    t.end()
})

t.test('generateDirectory() Throws an error if the directory does not exist', t => {
    t.throws(function() {
        generateDirectory('test', 'invalid-dir')
     }, new Error(`'test' is not writable or does not exist`), 'should throw an Error');
    t.end()
})