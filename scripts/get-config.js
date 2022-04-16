#! /usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer')
const path = require('path');
const yaml = require('js-yaml');

const returnMessage = require('./return-message')

const arguments = require('../data/arguments');
const questions = require('../data/questions')

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options(arguments)
  .help('h')
  .alias('h', 'help')
  .argv

const directoryRegex = RegExp(/^([A-Za-z0-9-_. ])+$/)

const configFile = '.buildcomrc'

const args = process.argv.slice(2)

const nameError = () => returnMessage('Component name is required', 'error')

const force = argv.force ? argv.force : false

buildConfig = async () => {
  if (fs.existsSync(path.join('.', configFile))) {
    returnMessage('🚀 .buildcomrc file detected.\r', 'success')
    const config = yaml.load(fs.readFileSync(path.join('.', configFile), 'utf8'));
    if (args.length === 0 || args[0] === '--force' || args[0] === '-f') {
      const name = await inquirer.prompt({
        type: 'input',
        name: 'componentName',
        message: 'What is your component called?',
        default: `Component C${Math.floor((Math.random() * 10000) + 1)}`,
        validate: value =>
          directoryRegex.test(value) ? true : 'Component name is invalid'
      });
      return [
        {
          componentName: name.componentName,
          ...config
        }
      ]
    } else {
      return argv._.map(arg => {
        return {
          'componentName': arg,
          ...config
        }
      })
    }
  }

  if (!args.length || args[0] === '--force' || args[0] === '-f') {
    return [await inquirer.prompt(questions)]
  }

  const {
    output,
    name,
    dirs,
    storybook,
    mdx,
    test,
    css,
    modules,
    typescript,
    typescriptInline,
    readme,
    prepopulate
  } = argv

  let answers = {}

  output ? answers.outputDirectory = output: '.'
  name ? answers.componentName = name : nameError();
  answers.createDirectories = dirs ? dirs : ''
  answers.createStories = storybook ? storybook : false
  answers.chooseStorybook = mdx ? mdx : false
  answers.createSpec = test ? test : false
  answers.useModules = modules ? modules : false
  answers.useTS = typescript ? typescript : false
  answers.createTypesFolder = typescriptInline ? typescriptInline : false
  answers.createReadme = readme ? readme : false
  answers.prepopulate = prepopulate ? prepopulate : false

  if (css) {
    answers.createStyleSheet = true
    answers.chooseStyleSheet = css
  } else {
    answers.createStyleSheet = false
  }

  return [answers]
}

module.exports = getConfig = async () => {
  const answers = await buildConfig()

  return await answers.map(answer => {
    const directories = () => {
      if (answer.createDirectories) {
        return answer.createDirectories.split(',')
      }

      if (answer.directories) { return answer.directories }

      return [];
    }

    const name = () => {
      if (answer.componentName) {
        return answer.componentName
      }
      return nameError();
    }

    const useStorybook = () => {
      if (answer.createStories) {
        // This is from the CLI
        return {
          mdx: answer.chooseStorybook || false,
          params: answer.storyParams || []
        }
      }
      if (answer.storybook) {
        // This is from the config file
        return {
          mdx: answer.storybook.use_mdx || false,
          params: answer.storybook.params || []
        }
      }
      return false
    }


    const useTests = () => {
      if (answer.createSpec) {
        // This is from the CLI
        return {
          extension: answer.createSpecType || 'test'
        }
      }
      if (answer.tests) {
        // This is from the config file
        return {
          extension: answer.tests.extension || 'test'
        }
      }
      return false
    }

    const useStyles = () => {
      if (answer.createStyleSheet) {
        // This is from the CLI
        return  {
          preprocessor: answer.chooseStyleSheet.toLowerCase() || 'none',
          modules: answer.useModules || false
        }
      }
      if (answer.styles) {
        // This is from the config file
        return {
          preprocessor: answer.styles.preprocessor.toLowerCase() || 'none',
          modules: answer.styles.modules || false
        }
      }
      return false
    }

    const useTypescript = () => {
      if (answer.useTS) {
        // This is from the CLI
        return {
          inline: answer.createTypesFolder || false
        }
      }
      if (answer.typescript) {
        // This is from the config file
        return {
          inline: answer.typescript.inline || false
        }
      }
      return false
    }

    return {
      name: name(),
      output: answer.outputDirectory || answer.output || '.',
      directories: directories(),
      storybook: useStorybook(),
      tests: useTests(),
      styles: useStyles(),
      typescript: useTypescript(),
      readme: answer.createReadme || answer.generate_readme || false,
      prepopulate: answer.prepopulate || false,
      force
    }
  })
}
