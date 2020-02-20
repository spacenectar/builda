const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const writeFile = require('./write-file')
const throwError = require('./throw-error')

const appDir = path.dirname(require.main.filename)

module.exports = generateFile = (name, props) => {
    const {
      componentDir,
      componentNameSentenceCase, 
      componentNameKebab, 
      blank, 
      useModules, 
      chooseStyleSheet
    } = props
  
    const stylesheet = chooseStyleSheet === 'stylus' ? 'styl' : chooseStyleSheet
  
    const srcName = name => {
      if (name === 'styles') {
        name = name.concat(`.${stylesheet.toLowerCase()}`)
      }
      return name
    }
  
    const writeName = name => {
      if (name === 'styles') {
        if (useModules !== undefined && useModules ) {
          name = srcName(name).replace('.', '.module.')
        } else {
          name = srcName(name)
        }
      } 
      return name    
    }
  
    // If blank files are not being generated
    if (!blank) {
      
      // Check if CSS Modules has been requested
      let cssString = ''
      let classesString = ''
      if (chooseStyleSheet !== undefined) {
        if (useModules !== undefined && !useModules)  {
          cssString = `import './styles.${stylesheet.toLowerCase()}'\n\n` 
          classesString = 'example style-${colour}'
        } else {
          cssString = `import styles from './styles.module.${stylesheet.toLowerCase()}'\n\n` 
          classesString = 'styles[colour]'
        }
      }
      
      // Generates the files and replaces any found strings
      try {
        const src = fs.readFileSync(`${appDir}/scaffold/${srcName(name)}`, 'utf8')
        .replace(/%ComponentExample%/g, componentNameSentenceCase)
        .replace(/%ComponentExampleKebab%/g, componentNameKebab)
        .replace(/%ComponentExampleSentence%/g, _.startCase(componentNameSentenceCase))
        .replace(/%styleimport%/g, cssString)
        .replace(/%classes%/g, classesString)
        
        writeFile(componentDir, writeName(name), src)
      } catch (err) {
        // The throwError function outputs a friendly error for users, if you are debugging this app
        // you will need to comment it out and replace it with the line below.
        // throw new Error(err)
        throwError(`'${srcName(name)}' is an invalid file name`)
      }  
  
    } else {
      // Creates an empty file with the correct name
      writeFile(componentDir, writeName(name), '')
    }
  }