const _ = require('lodash')
const path = require('path')

const generateDirectory = require('./generate-directory')
const generateFile = require('./generate-file')
const skip = require('./skip')
const returnMessage = require('./return-message')
const getCSSExt = require('./get-css-ext')

module.exports = comGen = answers => {
  
    const {
      componentName, 
      outputDirectory,
      useTS, 
      createStyleSheet, 
      useModules,
      chooseStyleSheet,
      createDirectories, 
      createSpec, 
      createStories, 
      chooseStorybook,
      createReadme,
      blank
    } = answers
  
    returnMessage(`\nCreating folder for ${componentName}' component`, {color: 'blue'})
    
    const componentNameSentenceCase = _.upperFirst(_.camelCase(componentName))
    const componentNameKebab = _.kebabCase(componentName)
  
    const jsext = x => useTS ? `ts${x}` : `js${x}`
    const cssext = chooseStyleSheet ? getCSSExt(chooseStyleSheet, useModules) : ''

    const storyExt = st => {
      let val = ''
      if (typeof(st) === 'boolean') {
        val =  st ? 'mdx' : jsext('x')
      } else {
        val = st.match(/mdx/i) ? 'mdx' : jsext('x')
      }     
      return val
    }

    const componentDir = path.join(outputDirectory, '/',  componentNameKebab)
  
    const props = {
      componentDir,
      componentNameKebab,
      componentNameSentenceCase,
      blank,
      useModules,
      chooseStyleSheet
    }
  
    // Create the component directory
    generateDirectory(componentDir)
  
    // Generate the index file
    generateFile(`index.${jsext('x')}`, props)
  
    // Generate the stories file
    createStories ? generateFile(`index.stories.${storyExt(chooseStorybook)}`, props) : skip('story files')
    
    // Generate the css file
    createStyleSheet ? generateFile(`styles`, props) : skip(`stylesheets`)
    
    // Generate the spec file
    createSpec ? generateFile(`index.spec.${jsext('x')}`, props) : skip('spec files')

    // Generate the d.ts file
    useTS && createStyleSheet ? generateFile(`styles.${cssext}.d.ts`, props) : null
    
    // Generate the readme file
    createReadme ? generateFile('README.md', props) : skip('README file')
    
    const dirArray = createDirectories.split(',')
  
    dirArray.length 
      ? dirArray.map(dirName => generateDirectory(dirName, componentDir))
      : skip('custom directories')
  
    // finish up
    setTimeout(() => returnMessage(`Component '${componentName}' has been created`, {color: 'green'}), 500)
  }