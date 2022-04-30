import fs from 'fs';
import { Question } from 'inquirer';
import yaml from 'js-yaml';

import { askQuestion, printMessage, questions } from '@helpers';

const fileName = '.buildatest.yml';

const init = () => {
  if (fs.existsSync(fileName)) {
    printMessage('You already have a config file. Aborting...\n\n', 'error');
    process.exit(1);
  }
  askQuestion({
    questionList: questions as Array<Question>
  }).then((answers) => {
    const typescript = answers.useTS
      ? {
          inline: answers.useTSInline
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
      directories: answers.createDirectories || false,
      prepopulate: answers.prepopulate || true
    };

    fs.writeFileSync(fileName, yaml.dump(config), 'utf8');
  });
};

export default init;
