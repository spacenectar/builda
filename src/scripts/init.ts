import fs from 'fs';
import { Question } from 'inquirer';
import yaml from 'js-yaml';

import { globals, askQuestion, printMessage, questions } from '@helpers';

const { configFileName, configFileNameLegacy } = globals;

const init = () => {
  if (fs.existsSync(configFileName)) {
    printMessage(
      `You already have a ${configFileName} file. Aborting...\n\n`,
      'error'
    );
    process.exit(1);
  }

  if (fs.existsSync(configFileNameLegacy)) {
    printMessage(
      `${configFileNameLegacy} file detected.\n Please note: Builda and Buildcom are very different programs. It is advised you either delete the ${configFileNameLegacy} file or continue to use the legacy buildcom package.\n\n`,
      'error'
    );
    process.exit(1);
  }
  askQuestion({
    questionList: questions as Array<Question>
  }).then((answers) => {
    const scaffoldList = [];

    if (answers.scaffoldSelection?.length) {
      scaffoldList.push(...answers.scaffoldSelection);
    }

    if (answers.customScaffoldList) {
      answers.customScaffoldList.split(',').forEach((scaffoldType: string) => {
        scaffoldList.push(scaffoldType.trim());
      });
    }

    const scaffolds = Object.fromEntries(
      scaffoldList.map((scaffoldType: string) => [
        scaffoldType,
        { path: '', scaffoldUrl: '' }
      ])
    );

    const config = {
      app: {
        name: answers.appName,
        outputDirectory: answers.outputDirectory,
        scaffoldUrl: answers.scaffoldUrl
      },
      scaffolds
    };

    fs.writeFileSync(configFileName, yaml.dump(config), 'utf8');

    return printMessage('Created config in project root', 'success');
  });
};

export default init;
