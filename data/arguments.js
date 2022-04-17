module.exports = {
    'output' : {
      description: 'Specifies an output directory',
      required: false,
      alias: 'o',
      type: 'string',
      default: '.'
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
    'mdx' : {
      description: 'Use MDX format for stories?',
      required: false,
      boolean: true,
      default: true,
    },
    'test' : {
      description: 'Generate test snapshot files? (Only Jest is supported right now)',
      required: false,
      alias: 't',
      boolean: true
    },
    'css' : {
      description: 'Choose a CSS file type (css (default), sass/scss, less, stylus)',
      required: false,
      alias: 'c',
      type: 'string',
      default: 'css'
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
      alias: 'T',
      boolean: true
    },
    'prepopulate' : {
      description: 'Generate components with example code?',
      required: false,
      alias: 'p',
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
