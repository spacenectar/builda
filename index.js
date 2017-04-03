#! /usr/bin/env node

var chalk = require('chalk')
var inquirer = require('inquirer')
var exec = require('child_process').exec
var fs = require('fs')

// 1: User types 'ctgen' the welecome message is immediately displayed

console.log(chalk.magenta('============================================='))
console.log(chalk.magenta(' Clarity Toolkit Component Generator (ctgen) '))
console.log(chalk.magenta('=============================================\n\n'))

// 2: ctgen checks that it is being called in the root folder and displays an error otherwise
fs.stat('clarity.js', function (err, stat) {
  if (err == null) {
    console.log(chalk.green('Clarity toolkit detected!\nLoading questions...\n\n'))
    questionTime()
  } else if (err.code === 'ENOENT') {
    console.error(chalk.red('Clarity toolkit is not installed or clarity.js is missing.\nProcess aborted with errors'))
    process.exit(1)
  }
})

var questions = [
  {
    type: 'input',
    name: 'componentName',
    message: 'What is your component called?',
    default: 'My New Component',
    validate: function (value) {
      var pass = value.length > 0
      if (pass) return true
      return 'Component name cannot be empty'
    }
  },
  {
    type: 'input',
    name: 'componentDesc',
    message: 'Please describe your component',
    validate: function (value) {
      var pass = value.length > 0
      if (pass) return true
      return 'Description cannot be empty'
    }
  },
  {
    type: 'input',
    name: 'userName',
    message: 'What is your full name?',
    validate: function (value) {
      var pass = value.length > 0
      if (pass) return true
      return 'Your name cannot be empty'
    }
  },
  {
    type: 'input',
    name: 'userGithub',
    message: 'What is your github username?',
    validate: function (value) {
      if (!value.length) return 'Github username field cannot be empty'
      return true
    }
  },
  {
    type: 'confirm',
    name: 'usesJavaScript',
    message: 'Does your component use JavaScript?',
    default: false
  },
  {
    type: 'confirm',
    name: 'createPrintSheets',
    message: 'Do you want to add print stylesheets?',
    default: false
  },
  {
    type: 'confirm',
    name: 'createIESheets',
    message: 'Do you want to add IE specifc stylesheets?',
    default: false
  }
]

var questionTime = function () {
  // 3: User is asked the following quetsions:

  // // 1. What is your component called?
  // // 2. Please describe the component
  // // 3. What is your full name?
  // // 4. What is your Github username?
  // // 5. Does your component use JavaScript?
  // // 6. Do you want to create print stylesheets?
  // // 7. Do you want to create ie stylesheets?
  console.log(chalk.yellow('Please answer the following:\n\n'))
  inquirer.prompt(questions).then(function (answers) {
    fileGen(answers)
  })
}

var createFile = function (fileName, componentName, doc) {
  // Tell the user what is happening
  console.log(chalk.blue('\nCreating', fileName, '...'))
  // Bring in the scaffold file (note this should point to the scaffold file in node modules)
  var scaffold = './scaffold/' + fileName
  fs.readFile(scaffold, 'utf8', function (err, data) {
    if (err) return console.log(chalk.red(err))
    var result = data.replace(/%cname%/g, componentName)
    if (doc) {
      var d = new Date()
      result = result.replace(/%cfname%/g, doc.componentName)
      result = result.replace(/%cdesc%/g, doc.componentDesc)
      result = result.replace(/%cauthor%/g, doc.userName)
      result = result.replace(/%cagithub%/g, doc.userGithub)
      result = result.replace(/%creationdate%/g, d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear())
    }

    fs.writeFile('./src/components/' + componentName + '/' + fileName, result, function (err) {
      if (err) return console.log(chalk.red(err))
      console.log(chalk.green(fileName, 'created!'))
    })
  })
}

var fileGen = function (answers) {
  console.log(chalk.blue('\n\nCreating folders for', answers.componentName, 'component'))
  var componentName = 'c-' + answers.componentName.toLowerCase().split(' ').join('-')
  var componentFolder = './src/components/' + componentName
  // 4: A folder is created in /src/components with the component name
  if (!fs.existsSync(componentFolder)) fs.mkdirSync(componentFolder)
  // 5: The following files are created in that folder
  // - view.php
  createFile('view.php', componentName)
  // - style.styl
  createFile('style.styl', componentName)
  // - script.js (if the user answered yes to Q5)
  if (answers.usesJavaScript) createFile('script.js', componentName)
  // - style.print.styl (if the user answered yes to Q6)
  if (answers.createPrintSheets) createFile('style.print.styl', componentName)
  // - style.ie.styl (if the user answered yes to Q7)
  if (answers.createIESheets) createFile('style.ie.styl', componentName)
  // - component.json
  createFile('component.json', componentName, answers)

  finishUp(componentName)
}

var finishUp = function (componentName) {
  // 6. The component register is automatically updated with the new component
  fs.stat('genreg.js', function (err, stat) {
    if (err == null) {
      console.log(chalk.green('Genreg detected!\nUpdating component register...'))
      exec('node genreg')
    } else if (err.code === 'ENOENT') {
      console.error(chalk.grey('Genreg not detected.\nSkipping registry update.'))
    }
  })
  // 7. A message is displayed to the user that component [component name] has been created and is ready to edit
  console.log(chalk.green('Component "', componentName, '" has been created'))
  console.warn(chalk.yellow('Please note: This has generated most of the documentation required in component.json but please ensure you keep it up to date and add any additional information to it.'))
}

// TODO: Make all of this work sequentially.
