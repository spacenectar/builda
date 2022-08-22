const Sequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends Sequencer {
  sort(tests) {
    const copyTests = Array.from(tests);

    const order = [
      'helpers/tests/convert-numbers-to-words.test.ts',
      'helpers/tests/convert-registry-path-to-url.test.ts',
      'helpers/tests/convert-symbols-to-words.test.ts',
      'helpers/tests/detect-case.test.ts',
      'helpers/tests/detect-path-type.test.ts',
      'helpers/tests/get-registry.test.ts',
      'helpers/tests/normalise-case.test.ts',
      'scripts/tests/init.test.ts',
      'scripts/tests/generate-scaffold-registry.test.ts',
      'scripts/tests/generate-commands.test.ts',
      'scripts/tests/build-from-scaffold.test.ts'
    ];

    return order.map((test) => {
      const index = copyTests.findIndex((t) => t.path.includes(test));
      return copyTests.splice(index, 1)[0];
    });
  }
}

module.exports = CustomSequencer;
