#! /usr/bin/env node

import { buildConfig, force } from './build-config';
import nameError from '@helpers/name-error';

const getConfig = async () => {
  const answer = await buildConfig();

  const directories = () => {
    if (answer.createDirectories) {
      return answer.createDirectories.split(',');
    }

    if (answer.directories) {
      return answer.directories;
    }

    return [];
  };

  const name = () => {
    if (answer.componentName) {
      return answer.componentName;
    }
    return nameError();
  };

  const useStorybook = () => {
    if (answer.createStories) {
      // This is from the CLI
      return {
        mdx: answer.chooseStorybook || false,
        params: answer.storyParams || []
      };
    }
    if (answer.storybook) {
      // This is from the config file
      return {
        mdx: answer.storybook.use_mdx || false,
        params: answer.storybook.params || []
      };
    }
    return false;
  };

  const useTests = () => {
    if (answer.createSpec) {
      // This is from the CLI
      return {
        extension: answer.createSpecType || 'test'
      };
    }
    if (answer.tests) {
      // This is from the config file
      return {
        extension: answer.tests.extension || 'test'
      };
    }
    return false;
  };

  const useStyles = () => {
    if (answer.createStyleSheet) {
      // This is from the CLI
      return {
        preprocessor: answer.chooseStyleSheet.toLowerCase() || 'none',
        modules: answer.useModules || false
      };
    }
    if (answer.styles) {
      // This is from the config file
      return {
        preprocessor: answer.styles.preprocessor.toLowerCase() || 'none',
        modules: answer.styles.modules || false
      };
    }
    return false;
  };

  const useTypescript = () => {
    if (answer.useTS) {
      // This is from the CLI
      return {
        inline: answer.createTypesFolder || false
      };
    }
    if (answer.typescript) {
      // This is from the config file
      return {
        inline: answer.typescript.inline || false
      };
    }
    return false;
  };

  return {
    name: name(),
    output: answer.outputDirectory || answer.output || '.',
    directories: directories(),
    storybook: useStorybook(),
    tests: useTests(),
    styles: useStyles(),
    typescript: useTypescript(),
    readme: answer.createReadme || answer.generate_readme || false,
    prepopulate: answer.prepopulate || false,
    force
  };
};

export default getConfig;
