import path from 'path';

import generateDirectory from './generate-directory';
import generateFile from './generate-file';

import { skip, changeCase, returnMessage } from '@helpers';

import { Config } from '@typedefs/config';

const comGen = (config: Config) => {
  const {
    name,
    output,
    storybook,
    tests,
    styles,
    typescript,
    readme,
    directories = [],
    prepopulate,
    force
  } = config;

  returnMessage(`\nCreating folder for ${name}' component`, 'notice');

  const componentNameSentenceCase = changeCase(name, 'sentence');
  const componentNameKebab = changeCase(name, 'kebab');
  const componentNamePascal = changeCase(name, 'pascal');

  const jsext = (x: string) => (typescript ? `ts${x}` : `js${x}`);
  const componentDir = path.join(output, '/', componentNameKebab);

  const props = {
    componentDir,
    componentNameKebab,
    componentNameSentenceCase,
    componentNamePascal,
    prepopulate
  };

  // Create the component directory§
  generateDirectory({ name: componentDir, force }).then(() => {
    // generate subdirectories
    const dirs = [...directories];

    if (!typescript?.inline) {
      dirs.push('types');
    }

    if (dirs.length) {
      generateDirectory({ name: componentDir, dirs, force: false });
    }

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
      });
    } else {
      skip('storybook stories');
    }

    // Generate the css file
    if (styles) {
      generateFile(`styles`, {
        ...props,
        preprocessor: styles.preprocessor,
        useModules: styles.modules
      });
    } else {
      skip(`stylesheets`);
    }

    // Generate the spec file
    tests
      ? generateFile(`index.${tests.extension}.${jsext('x')}`, props)
      : skip('test files');

    if (typescript) {
      // Extra things are needed if TypeScript is enabled and it is not inlined
      if (!typescript.inline) {
        // Create the props interface
        return generateFile('props.d.ts', {
          ...props,
          customDir: 'types'
        });
      }
    }

    // Generate the readme file
    readme && generateFile('README.md', props);

    // finish up
    setTimeout(
      () => returnMessage(`✅ Component '${name}' has been created`, 'success'),
      500
    );
  });
};

export default comGen;
