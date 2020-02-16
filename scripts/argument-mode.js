
const throwError = require('./throw-error')
const returnMessage = require('./return-message')

module.exports = argumentMode = argv => {
  
  returnMessage('Argument mode, skipping questionnaire', {color: 'yellow'})
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
  
  return answers
}