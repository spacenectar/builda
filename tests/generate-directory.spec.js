const t = require('tap')
const rimraf = require('rimraf')

const generateDirectory = require('../scripts/generate-directory')

const dir = t.testdir()

t.test('Generates a directory called "test" in the testdir', t => {
    t.matchSnapshot(generateDirectory('test', dir))
    t.end()
})

t.test('Generates a directory called "test" in the root', t => {
    t.matchSnapshot(generateDirectory('test'))
    t.end()
})

t.test('Generates a directory called "test" in the root when one already exists', t => {
    t.throws(function() {
        generateDirectory('test')
     }, new Error(`test already exists, aborting`), 'should throw an Error');
    t.end()
})

t.test('Generates a directory called "test" in the root when one already exists but with --force applied', t => {
    t.matchSnapshot(generateDirectory('test', null, true))
    t.end()
})

t.test('generateDirectory() Throws an error if the directory does not exist', t => {
    t.throws(function() {
        generateDirectory('test', 'invalid-dir')
     }, new Error(`'test' is not writable or does not exist`), 'should throw an Error');
    t.end()
})

t.teardown(() => rimraf.sync('test'))