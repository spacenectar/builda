module.exports = {
    'output' : {
      description: 'Specifies an output directory',
      required: false,
      alias: 'o',
      type: 'string'
    },
    'name' : {
      description: 'Specifies a component name',
      required: false,
      alias: 'n',
      type: 'string'
    },
    'dirs' : {
      description: 'A comma-separated list of directory names to generate',
      required: false,
      alias: 'd',
      type: 'string'
    },
    'storybook' : {
      description: 'Generate storybook files?',
      required: false,
      alias: 's',
      boolean: true
    },
    'jest' : {
      description: 'Generate jest files?',
      required: false,
      alias: 'j',
      boolean: true
    },
    'css' : {
      description: 'Choose a CSS file type (css, sass/scss, less, stylus)',
      required: false,
      alias: 'c',
      type: 'string'
    },
    'modules' : {
      description: 'Use CSS modules',
      required: false,
      alias: 'm',
      boolean: true
    },
    'typescript' : {
      description: 'Use TypeScript?',
      required: false,
      alias: 't',
      boolean: true
    },
    'blank' : {
      description: 'Only generate blank files?',
      required: false,
      alias: 'b',
      boolean: true
    },
    'readme' : {
      description: 'Generate a README file?',
      required: false,
      alias: 'r',
      boolean: true
    },
    'force' : {
      description: 'Ignores existing directories and overwrites files anyway.',
      required: false,
      alias: 'f',
      boolean: true
    }
  }