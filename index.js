#! /usr/bin/env node

const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const questions = require('./questions')
const arguments = require('./arguments')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options(arguments)
  .help('h')
  .alias('h', 'help')
  .argv

const args = process.argv.slice(2)
const appDir = path.dirname(require.main.filename)

// Ask the user the predefined questions
const questionTime = () => {
  console.log(chalk.yellow('Please answer the following:\n\n'))
  inquirer.prompt(questions).then(answers => fileGen(answers))
}

const writeFile = (c, n, o) => {
  fs.writeFile(path.join(c, n), o, err => {
    err && throwError(err)
  })
}

const generateFile = (name, props) => {
  const {
    componentNameSentenceCase, 
    componentNameKebab, 
    blank, 
    useModules, 
    chooseStyleSheet
  } = props

  const stylesheet = chooseStyleSheet === 'stylus' ? 'styl' : chooseStyleSheet

  const srcName = name => {
    if (name === 'styles') {
      name = name.concat(`.${stylesheet.toLowerCase()}`)
    }
    return name
  }

  const writeName = name => {
    if (name === 'styles') {
      if (useModules !== undefined && useModules ) {
        name = srcName(name).replace('.', '.module.')
      } else {
        name = srcName(name)
      }
    } 
    return name    
  }

  if (!blank) {
    // Generates the files and replaces any found strings
    const cssString = (chooseStyleSheet !== undefined && useModules !== undefined && !useModules) ? `import './styles.${stylesheet}'\n\n` : ''
    
    try {
      const src = fs.readFileSync(`${appDir}/scaffold/${srcName(name)}`, 'utf8')
      .replace(/%ComponentExample%/g, componentNameSentenceCase)
      .replace(/%ComponentExampleKebab%/g, componentNameKebab)
      .replace(/%ComponentExampleSentence%/g, _.startCase(componentNameSentenceCase))
      .replace(/%styleimport%/g, cssString)
      
      writeFile(componentNameKebab, writeName(name), src)
    } catch {
      throwError(`'${srcName(name)}' is an invalid file name`)
    }  

  } else {
    // Creates an empty file with the correct name
    writeFile(componentNameKebab, writeName(name), '')
  }
}

const generateDirectory = (name, dir) => {
  const output = dir ? path.join(dir, name) : name
  if (!fs.existsSync(output)) {
    try {
      fs.mkdirSync(output)
    } catch (err) {
      throwError(err)
    }
  } 
}

const skip = type => console.log(chalk.blue(`Skipping generation of ${type} due to user selection`))

const fileGen = function (answers) {
  
  const {
    componentName, 
    useTS, 
    createStyleSheet, 
    useModules,
    chooseStyleSheet,
    createDirectories, 
    createSpec, 
    createStories, 
    createReadme,
    blank
  } = answers

  console.log(chalk.blue('\n\nCreating folders for', componentName, 'component'))
  
  const componentNameSentenceCase = _.upperFirst(_.camelCase(componentName))
  const componentNameKebab = _.kebabCase(componentName)

  const jsext = useTS ? 'ts' : 'js'

  const props = {
    componentNameKebab,
    componentNameSentenceCase,
    blank,
    useModules,
    chooseStyleSheet
  }

  // Create the component directory
  generateDirectory(componentNameKebab)

  // Generate the index file
  generateFile(`index.${jsext}x`, props)

  // Generate the stories file
  createStories ? generateFile('index.stories.mdx', props) : skip('story files')
  
  // Generate the css file
  createStyleSheet ? generateFile(`styles`, props) : skip(`stylesheets`)
  
  // Generate the spec file
  createSpec ? generateFile(`index.spec.${jsext}x`, props) : skip('spec files')
  
  // Generate the readme file
  createReadme ? generateFile('README.md', props) : skip('README file')
  
  const dirArray = createDirectories.split(',')

  dirArray.length 
    ? dirArray.map(dirName => generateDirectory(dirName, componentNameKebab))
    : skip('custom directories')

  // finish up
  setTimeout(() => {
    finishUp(componentName, answers)
  }, 500)
}

const finishUp = componentName => 
  console.log(chalk.green('Component"', componentName, '"has been created'))


const throwError = msg => {
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

  const {
    output, 
    name, 
    dirs, 
    storybook, 
    jest, 
    css, 
    modules, 
    typescript, 
    readme, 
    blank
  } = argv

  output ? answers.outputDirectory = output: '.'
  name ? answers.componentName = name : throwError('Name parameter is required')
  answers.createDirectories = dirs ? dirs : ''
  answers.createStories = storybook ? storybook : false
  answers.createSpec = jest ? jest : false
  answers.useModules = modules ? modules : false
  answers.useTS = typescript ? typescript : false
  answers.createReadme = readme ? readme : false
  answers.blank = blank ? blank : false

  if (css) {
    answers.createStyleSheet = true
    answers.chooseStyleSheet = css
  } else {
    answers.createStyleSheet = false
  }
  
  fileGen(answers)
}
