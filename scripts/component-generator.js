const _ = require('lodash')
const path = require('path')

const generateDirectory = require('./generate-directory')
const generateFile = require('./generate-file')
const skip = require('./skip')
const returnMessage = require('./return-message')

module.exports = comGen = config => {

    const {
      name,
      output,
      storybook,
      tests,
      styles,
      typescript,
      readme,
      directories,
      prepopulate,
      force
    } = config

    returnMessage(`\nCreating folder for ${name}' component`, {color: 'blue'})

    const componentNameSentenceCase = _.upperFirst(_.camelCase(name))
    const componentNameKebab = _.kebabCase(name)

    const jsext = x => typescript ? `ts${x}` : `js${x}`
    const componentDir = path.join(output, '/',  componentNameKebab)

    const props = {
      componentDir,
      componentNameKebab,
      componentNameSentenceCase,
      prepopulate
    }

    // Create the component directory§
    generateDirectory({name: componentDir, force}).then(() => {
      // Generate the index file
      generateFile(`index.${jsext('x')}`, {
        ...props,
        useModules: styles ? styles.modules : false,
        preprocessor: styles ? styles.preprocessor : false,
        inlineTs: typescript && typescript.inline
      });

      // Generate the stories file
      if (storybook) {
        const ext = storybook.mdx ? 'mdx' : jsext('x');
        generateFile(`index.stories.${ext}`, {
          ...props,
          storyParams: storybook.params,
          use_mdx: storybook.mdx,
          readme
        })
      } else {
        skip('storybook stories')
      }

      // Generate the css file
      if (styles) {
        generateFile(`styles`, {
          ...props,
          preprocessor: styles.preprocessor
        })
      } else {
        skip(`stylesheets`)
      }

      // Generate the spec file
      tests ? generateFile(`index.${tests.extension}.${jsext('x')}`, props) : skip('test files')

      if (typescript)  {
        // Extra things are needed if TypeScript is enabled and it is not inlined
        if (!typescript.inline) {
          // Create the types folder
          generateDirectory({name: path.join(componentDir, 'types'), force: true}).then(() => {
            return true;
          }).catch(err => {
            console.log(err)
          })

          // Create the props interface
          generateFile('props.d.ts',
            {
              ...props,
              customDir: 'types',
            }
          )
        }
      }

      // Generate the readme file
      readme && generateFile('README.md', props)

      directories && directories.length
        ? directories.map(dirName => generateDirectory({
          dir: dirName,
          name: componentDir,
          force: true
        })).then(() => {
          return true
        }).catch(err => {
          console.log(err)
        })
        : skip('custom directories')

      // finish up
      setTimeout(() => returnMessage(`✅ Component '${name}' has been created`, 'success'), 500)
    })
  }
