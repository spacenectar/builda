
const returnMessage = require('./return-message')

module.exports = argumentMode = argv => {

  returnMessage('Argument mode, skipping questionnaire', 'notice')
  let answers = {}

  const {
    output,
    name,
    dirs,
    storybook,
    mdx,
    jest,
    css,
    modules,
    typescript,
    readme,
    blank
  } = argv

  output ? answers.outputDirectory = output: '.'
  name ? answers.componentName = name : returnMessage('Name parameter is required', 'error')
  answers.createDirectories = dirs ? dirs : ''
  answers.createStories = storybook ? storybook : false
  answers.chooseStorybook = mdx ? mdx : false
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
