const t = require('tap')

const generateFile = require('../scripts/generate-file')

const dir = t.testdir()

const props = {
    componentDir: dir,
    componentNameSentenceCase : dir, 
    componentNameKebab: dir
}

t.test('Generates a stylesheet file', t => {
    t.matchSnapshot(generateFile('styles', { ...props, chooseStyleSheet: 'stylus'}))
    t.end()
})

t.test('Generates an index.jsx file', t => {
    t.matchSnapshot(generateFile('index.jsx', props))
    t.end()
})

t.test('Generates a blank stylus file', t => {
    t.matchSnapshot(generateFile('styles', { ...props, chooseStyleSheet: 'stylus', blank: true}))
    t.end()
})

t.test('Generates a blank stylus modules file', t => {
    t.matchSnapshot(generateFile('styles', { ...props, chooseStyleSheet: 'stylus', useModules: true}))
    t.end()
})

t.test('Throws an error if an invalid file name is used', t => {
    t.throws(function() {
        generateFile('.%invalid"', props)
     }, new Error(`'.%invalid"' is an invalid file name`), 'should throw an Error');
    t.end()
})