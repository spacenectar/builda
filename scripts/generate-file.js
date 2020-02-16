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
  
    if (!blank) {
      // Generates the files and replaces any found strings
      const cssString = (chooseStyleSheet !== undefined && useModules !== undefined && !useModules) ? `import './styles.${stylesheet.toLowerCase()}'\n\n` : ''
      
      try {
        const src = fs.readFileSync(`${appDir}/scaffold/${srcName(name)}`, 'utf8')
        .replace(/%ComponentExample%/g, componentNameSentenceCase)
        .replace(/%ComponentExampleKebab%/g, componentNameKebab)
        .replace(/%ComponentExampleSentence%/g, _.startCase(componentNameSentenceCase))
        .replace(/%styleimport%/g, cssString)
        
        writeFile(componentDir, writeName(name), src)
      } catch {
        throwError(`'${srcName(name)}' is an invalid file name`)
      }  
  
    } else {
      // Creates an empty file with the correct name
      writeFile(componentDir, writeName(name), '')
    }
  }