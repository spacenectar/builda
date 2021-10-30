module.exports = configMode = (componentName, config) => {  
  let answers = {}

  const { output,
    use_typescript,
    use_storybook,
    story_format_mdx,
    use_jest,
    test_file_name,
    output_stylesheet,
    css_preprocessor,
    css_modules,
    generate_readme,
    create_types_subfolder,
    output_empty_files } = config

  answers.componentName = componentName
  answers.outputDirectory = output || '.'
  answers.createStories = use_storybook || false
  answers.chooseStorybook = story_format_mdx || false
  answers.createSpec = use_jest || false
  answers.test_file_name = test_file_name || 'test'
  answers.createStyleSheet = output_stylesheet || true
  answers.chooseStyleSheet = css_preprocessor || 'none'
  answers.createTypesFolder = create_types_subfolder || false
  answers.useModules = css_modules || false
  answers.useTS = use_typescript || false
  answers.createReadme = generate_readme || false
  answers.createDirectories = ''
  answers.blank = output_empty_files || false
 
  return answers
}