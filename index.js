// 1: User types 'node component-gen'
var chalk = require('chalk')
var fs = require('fs')
var inquirer = require('inquirer').prompt
var exec = require('child-process').exec

// 2: code checks that it is being called in the root folder and displays an error otherwise

// 3: User is asked the following quetsions:

// // 1. What is your component called?
// // 2. What does your component do?
// // 3. What is your name?
// // 4. What is your github username?
// // 5. Does your component use javascript?
// // 6. Create ie and print stylesheets?

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
// 6. The component register is automatically updated with the new component
// 7. A message is displayed to the user that component [component name] has been created and is ready to edit

