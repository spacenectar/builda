import { returnMessage, directoryRegex, nameError } from '@helpers';

import fs from 'fs';
import inquirer from 'inquirer';
import path from 'path';
import yaml from 'js-yaml';

import arguments from '@data/arguments.json';
import questions from './questions';
import { Answers } from '@typedefs/answers';

const argv = require('yargs')
  .usage('Usage: $0 [options]')
  .options(arguments)
  .help('h')
  .alias('h', 'help').argv;

export const force = argv.force ? argv.force : false;

const configFile = '.buildcomrc';

const args = process.argv.slice(2);

export const buildConfig = async () => {
  if (fs.existsSync(path.join('.', configFile))) {
    returnMessage('🚀 .buildcomrc file detected.\r', 'success');
    const config = yaml.load(
      fs.readFileSync(path.join('.', configFile), 'utf8')
    ) as Object;
    if (args.length === 0 || args[0] === '--force' || args[0] === '-f') {
      const name = await inquirer.prompt({
        type: 'input',
        name: 'componentName',
        message: 'What is your component called?',
        default: `Component C${Math.floor(Math.random() * 10000 + 1)}`,
        validate: (value) =>
          directoryRegex.test(value) ? true : 'Component name is invalid'
      });
      return [
        {
          componentName: name.componentName,
          ...config
        }
      ];
    } else {
      return argv._.map((arg: string) => {
        if (directoryRegex.test(arg)) {
          return {
            componentName: arg,
            ...config
          };
        } else {
          return returnMessage(`${arg} is not a valid component name`, 'error');
        }
      });
    }
  }

  if (!args.length || args[0] === '--force' || args[0] === '-f') {
    return [await inquirer.prompt(questions)];
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
  } = argv;

  let answers: Answers = {
    outputDirectory: '.',
    useTS: false,
    createTypesFolder: false,
    createDirectories: false,
    createStyleSheet: false,
    useModules: false,
    createStories: false,
    createReadme: false,
    prepopulate: false,
    createSpec: false,
    componentName: '',
    chooseStorybook: '',
    chooseStyleSheet: ''
  };

  output ? (answers.outputDirectory = output) : '.';
  name ? (answers.componentName = name) : nameError();
  answers.createDirectories = dirs ? dirs : '';
  answers.createStories = storybook ? storybook : false;
  answers.chooseStorybook = mdx ? mdx : false;
  answers.createSpec = test ? test : false;
  answers.useModules = modules ? modules : false;
  answers.useTS = typescript ? typescript : false;
  answers.createTypesFolder = typescriptInline ? typescriptInline : false;
  answers.createReadme = readme ? readme : false;
  answers.prepopulate = prepopulate ? prepopulate : false;

  if (css) {
    answers.createStyleSheet = true;
    answers.chooseStyleSheet = css;
  } else {
    answers.createStyleSheet = false;
  }

  return [answers];
};

export default buildConfig;
