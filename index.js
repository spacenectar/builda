
var chalk = require('chalk')
var inquirer = require('inquirer')
var argv = require('yargs').argv
var exec = require('child_process').exec
var fs = require('fs')

// 1: User types 'ctgen' the welecome message is immediately displayed

console.log(chalk.magenta('============================================='))
console.log(chalk.magenta(' Clarity Toolkit Component Generator (ctgen) '))
console.log(chalk.magenta('=============================================\n\n'))

// 2: ctgen checks that it is being called in the root folder and displays an error otherwise
fs.stat('clarity.js', function (err, stat) {
  if (err == null) {
    console.log(chalk.green('Clarity toolkit detected!\nContinuing process...'))
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
    name: 'componentDesc',
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
    default: true
  },
  {
    type: 'confirm',
    name: 'createIeSheets',
    message: 'Do you want to add print and IE stylesheets?',
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
  // // 6. Do you want to create ie and print stylesheets?
  inquirer.prompt(questions).then(function (answers) {
    console.log(JSON.stringify(answers, null, '  '))
  })
}

var folderGen = function () {
  // 4: A folder is created in /src/components with the component name
  // 5: The following files are created in that folder

  // // - view.php
  // // - style.styl
  // // - component.json
  // // - script.js (if the user answered yes to Q5)
  // // - style.print.styl (if the user answered yes to Q6)
  // // - style.ie.styl (if the user answered yes to Q6)

  // component.json will contain a generated document which is pulled from the input the user gave earlier
  // view.php will contain <!-- [component name] starts here --> and a closing comment
  // script.js will be a namespaced file
  // style.styl will contain a require to the toolkit and will have an empty class with the correct component name.
  // style.*.styl will contain stylesheets specifically made to display content differently based on how it is being viewed.
  finishUp()
}

var finishUp = function () {
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
  console.log(chalk.green('Component [] has been created'))
  console.warn(chalk.yellow('Please note: This has generated most of the documentation required in component.json but please ensure you keep it up to date and add any additional information to it.'))
}

