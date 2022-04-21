const fs = require('fs')
const path = require('path')
const writeFile = require('./write-file')
const getCSSExt = require('./get-css-ext')
const returnMessage = require('./return-message')

const appDir = path.dirname(require.main.filename)


module.exports = generateFile = (name, props) => {
    const {
      componentDir,
      componentNameSentenceCase,
      componentNameKebab,
      componentNamePascal,
      prepopulate,
      useModules,
      preprocessor,
      inlineTs,
      storyParams,
      use_mdx,
      readme,
      customDir
    } = props

    const inlineTypes = `
// Prop Types
export interface Props {
${
prepopulate ?
`  /**
    * The name of the component
    */
  name: string;
` : ''}}
`

    const importedTypes = `
// Import Types
import Props from './types/props'
`

    const importedReadme = `
// Import readme
import docs from './README.md'
`

    const dir = customDir ? path.join(componentDir, customDir) : componentDir
    const stylesheet = preprocessor && getCSSExt(preprocessor, useModules) || ''

    const srcName = name => {
      if (name === 'styles') {
        name = name.concat(`.${stylesheet}`)
      }
      return name
    }

      const scaffoldPath = prepopulate ? path.join(appDir, 'scaffold', 'prepopulated') : path.join(appDir, 'scaffold', 'blank')


      const cssString = useModules ? `// Import Stylesheet \nimport styles from './styles.${stylesheet}'` : `import './styles.${stylesheet}'`
      const classesString = useModules ? `styles['${componentNameKebab}']` : `"style-${componentNameKebab}"`
      const typeString = (inlineTs) ? inlineTypes : importedTypes;

      const makeStoryParams = (mdx, readme, params)  => {
        const storyParamsString = params ? params.join(', ') : ''

        if (storyParamsString) {
          if (mdx) {
            return `parameters={{ ${storyParamsString} }}`
          }

          return `parameters: {
            ${storyParamsString},
            ${readme && `readme: {
              // Show readme before story
              content: docs
            }`}
          }`
        }

        return ''
      }


      const extraParams = storyParams ? makeStoryParams(use_mdx, readme, storyParams) : ''

      const replaceText = () => {
        return fs.readFile(`${scaffoldPath}/${srcName(name)}`, 'utf8', (err, data) => {
          if (err) {
            return returnMessage(`Error reading ${srcName(name)}`, 'error')
          } else {
            let newData =
              data
              .replace(/%ComponentName%/g, componentNamePascal)
              .replace(/%ComponentNameKebab%/g, componentNameKebab)
              .replace(/%ComponentNameSentence%/g, componentNameSentenceCase)

            if (name === 'index.tsx' || name === 'index.jsx') {
              newData = newData
                .replace(/%typeString%/g, typeString)
                .replace(/%styleimport%/g, cssString)
                .replace(/%classes%/g, classesString)
            }

            if (name === 'index.stories.tsx' || name === 'index.stories.jsx') {
              newData = newData
                .replace(/%readmeimport%/g, importedReadme)
            }

            if (storyParams) {
              newData = newData
                .replace(/%extraParams%/g, extraParams)
            }

            return writeFile(dir, srcName(name), newData)
          }
        })
      }


      // Generates the files and replaces any found strings
      try {
        replaceText()
      } catch (err) {
        // The returnMessage function outputs a friendly error for users, if you are debugging this app
        // you will need to comment it out and replace it with the line below.
        // throw new Error(err)
        returnMessage(`'${srcName(name)}' is an invalid file name`, 'error')
      }
  }
