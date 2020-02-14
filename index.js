#! /usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const questions = require('./questions')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options({
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
      description: 'Generate CSS files (currently only SASS modules are supported)?',
      required: false,
      alias: 'c',
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
    }
  })
  .help('h')
  .alias('h', 'help')
  .argv

const args = process.argv.slice(2)
const appDir = path.dirname(require.main.filename)

// Ask the user the predefined questions
const questionTime = () => {
  console.log(chalk.yellow('Please answer the following:\n\n'))
  inquirer.prompt(questions).then(function (answers) {
    fileGen(answers)
  })
}

const generateFile = (name, k, s) => {
  // Generates the files and replaces any found strings
  const src = fs.readFileSync(`${appDir}/scaffold/${name}`, 'utf8')
              .replace(/%ComponentExample%/g, s)
              .replace(/%ComponentExampleKebab%/g, k)
              // A few extra bits need doing if it should be use in a sentence
              .replace(/%ComponentExampleSentence%/g, _.startCase(s))
  fs.writeFile(path.join(k, name), src, err => {
    err && console.error(err)
  })
}

const generateDirectory = (name, dir) => {
  const output = dir ? path.join(dir, name) : name
  if (!fs.existsSync(output)) {
    try {
      fs.mkdirSync(output)
    } catch (exception) {
      throw new Error(exception)
    }
  }
}

const skip = type => console.log(chalk.blue(`Skipping generation of ${type} due to user selection`))

var fileGen = function (answers) {
  const {
    componentName, 
    useTS, 
    createStyleSheet, 
    createDirectories, 
    createSpec, 
    createStories, 
    createReadme
  } = answers

  console.log(chalk.blue('\n\nCreating folders for', componentName, 'component'))
  
  var componentNameSentenceCase = _.upperFirst(_.camelCase(componentName))
  var componentNameKebab = _.kebabCase(componentName)

  var ext = useTS ? 'ts' : 'js'

  // Create the component directory
  generateDirectory(componentNameKebab)

  // Generate the index file
  generateFile(`index.${ext}x`, componentNameKebab, componentNameSentenceCase)

  // Generate the stories file
  createStories ? generateFile('index.stories.mdx', componentNameKebab, componentNameSentenceCase) : skip('story files')
  
  // Generate the sass file
  createStyleSheet ? generateFile('styles.module.scss', componentNameKebab, componentNameSentenceCase) : skip('stylesheets')
  
  // Generate the spec file
  createSpec ? generateFile(`index.spec.${ext}x`, componentNameKebab, componentNameSentenceCase) : skip('spec files')
  
  // Generate the readme file
  createReadme ? generateFile('README.md', componentNameKebab, componentNameSentenceCase) : skip('README file')
  
  const dirArray = createDirectories.split(',')

  dirArray.length 
    ? dirArray.map(dirName => generateDirectory(dirName, componentNameKebab))
    : skip('custom directories')

  // finish up
  setTimeout(function () {
    finishUp(componentName, answers)
  }, 500)
}

const finishUp = function (componentName, answers) {
  console.log(chalk.green('Component "', componentName, '" has been created'))
}

const throwError = (msg) => {
  console.error(chalk.red.bold('Fatal error:'), msg)
  process.exit(1)
}
  
console.log(chalk.magenta('============================================='))
console.log(chalk.white(' React component builder (buildcom) '))
console.log(chalk.magenta('=============================================\n\n'))

if (args.length === 0 ) {
  questionTime() 
} else {
  console.log(chalk.yellow('Argument mode, skipping questionnaire'))
  let answers = {}

  const {output, name, dirs, storybook, jest, css, typescript, readme, blank} = argv

  output ? answers.outputDirectory = output: throwError('Output parameter is required')
  name ? answers.componentName = name : throwError('Name parameter is required')
  answers.createDirectories = dirs ? dirs : ''
  answers.createStories = storybook ? storybook : false
  answers.createSpec = jest ? jest : false
  answers.createStyleSheet = css ? css : false
  answers.useTS = typescript ? typescript : false
  answers.createReadme = readme ? readme : false
  answers.createStories = blank ? blank : false
  
  fileGen(answers)
}
