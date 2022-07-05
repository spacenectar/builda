import fs from 'fs';
import { Question } from 'inquirer';
import yaml from 'js-yaml';

import {
  globals,
  askQuestion,
  printMessage,
  questions,
  configContents
} from '@helpers';

const fileName = globals.configFileName;

const init = () => {
  if (fs.existsSync(fileName)) {
    printMessage(
      `You already have a ${fileName} file. Aborting...\n\n`,
      'error'
    );
    process.exit(1);
  }
  askQuestion({
    questionList: questions as Array<Question>
  }).then((answers) => {
    const typescript = answers.useTS
      ? {
          inline: answers.useTSInline === 'inline'
        }
      : false;

    const storybook = answers.createStories
      ? {
          story_format: answers.chooseStorybook
        }
      : false;

    const tests = answers.createTests
      ? {
          extension: answers.testType
        }
      : false;

    const styles = answers.createStyleSheet
      ? {
          preprocessor: answers.chooseStyleSheet,
          modules: answers.useModules
        }
      : false;

    const config = {
      output: answers.outputDirectory || './src/components',
      typescript,
      storybook,
      tests,
      styles,
      generate_readme: answers.createReadme || false,
      extra_directories: answers.createDirectories || false,
      prepopulate: answers.prepopulate || true
    };

    const configWithComments = configContents(yaml.dump(config));

    fs.writeFileSync(fileName, configWithComments, 'utf8');
  });
};

export default init;
