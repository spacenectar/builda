
var chalk = require('chalk')
var inquirer = require('inquirer')
var path = require('path')
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
    folderGen(answers)
  })
}

var folderGen = function (answers) {
  console.log(chalk.blue('\n\nCreating folders for', answers.componentName, 'component'))
  var componentName = 'c-' + answers.componentName.replace(' ', '-').toLowerCase()
  var componentFolder = './src/components/' + componentName
  // 4: A folder is created in /src/components with the component name
  if (!path.existsSync(componentFolder)) {
    fs.mkdirSync(componentFolder, 744)
  }
  // 5: The following files are created in that folder
  // - view.php
  fs.writeFile(componentFolder + '/view.php', 'File contents', function (err) {
    if (err) return console.log(chalk.red(err))
    console.log(chalk.green('View file created!'))
  })
  // - style.styl
  fs.writeFile(componentFolder + '/style.styl', 'File contents', function (err) {
    if (err) return console.log(chalk.red(err))
    console.log(chalk.green('Stylesheet created!'))
  })
  // - component.json
  fs.writeFile(componentFolder + '/component.json', 'File contents', function (err) {
    if (err) return console.log(chalk.red(err))
    console.log(chalk.green('Component documentation created!'))
  })
  // - script.js (if the user answered yes to Q5)
  if (answers.usesJavaScript) {
    fs.writeFile(componentFolder + '/script.js', 'File contents', function (err) {
      if (err) return console.log(chalk.red(err))
      console.log(chalk.green('Script file created!'))
    })
  }
  // - style.print.styl (if the user answered yes to Q6)
  if (answers.createPrintSheets) {
    fs.writeFile(componentFolder + '/style.print.styl', 'File contents', function (err) {
      if (err) return console.log(chalk.red(err))
      console.log(chalk.green('Print stylesheet created!'))
    })
  }

  // - style.ie.styl (if the user answered yes to Q7)
  if (answers.createIESheets) {
    fs.writeFile(componentFolder + '/style.ie.styl', 'File contents', function (err) {
      if (err) return console.log(chalk.red(err))
      console.log(chalk.green('IE stylesheet created!'))
    })
  }

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

