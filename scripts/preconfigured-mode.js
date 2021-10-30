const throwError = require('./throw-error')
const returnMessage = require('./return-message')
const { use_typescript } = require('../buildcom.config')

module.exports = argumentMode = con => {
  
  returnMessage('buildcom.config.js file detected.', {color: 'yellow'})
  let answers = {}

  const { output,
    use_typescript,
    use_storybook,
    story_format_mdx,
    use_jest,
    test_file_name,
    output_stylesheets,
    css_preprocessor,
    css_modules,
    generate_readme,
    create_types_subfolder,
    output_example_code } = config

  answers.outputDirectory = output || '.'
  answers.createStories = use_storybook || false
  answers.chooseStorybook = story_format_mdx || false
  answers.createSpec = use_jest || false
  answers.test_file_name = test_file_name || 'test'
  answers.outputStylesheets = output_stylesheets || true
  answers.chooseStyleSheet = css_preprocessor || 'none'
  answers.createTypesFolder = create_types_subfolder || false
  answers.useModules = css_modules || false
  answers.useTS = use_typescript || false
  answers.createReadme = generate_readme || false
  answers.blank = output_example_code || true
 
  return answers
}