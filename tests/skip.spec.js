const t = require('tap')

const skip = require('../scripts/skip')

t.test('skip() Returns the expected console message', async t => {
    t.matchSnapshot(skip('test'), "Skipping generation of test due to user selection")
    t.end()
})