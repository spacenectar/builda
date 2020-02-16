const t = require('tap')
const argumentMode = require('../scripts/argument-mode')
const arguments = require('../data/arguments')

const yargs = require('yargs')
 
t.test('Calls argument mode with css', t => {
    const argv = yargs('--name "test name" --css "stylus"')
    .options(arguments)
    .argv
    t.matchSnapshot(argumentMode(argv), "Argument mode, skipping questionnaire")
    t.end()
})

t.test('calls argument mode with almost everything else', t => {
    const argv = yargs('--name "test name" --dirs "one, two" -sjrt')
    .options(arguments)
    .argv
    t.matchSnapshot(argumentMode(argv), "Argument mode, skipping questionnaire")
    t.end()
})

t.test('calls argument mode without name', t => {
    const argv = yargs('-b')
    .options(arguments)
    .argv
    t.throws(function() {
        argumentMode(argv)
     }, new Error(`Name parameter is required`), 'should throw an Error');
    t.end()    
})