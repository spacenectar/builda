import fs from 'fs';
import { Question } from 'inquirer';
import yaml from 'js-yaml';

import { globals, askQuestion, printMessage, questions } from '@helpers';

const { configFileName, configFileNameLegacy, docSiteUrl } = globals;

const init = (force?: boolean) => {
  if (fs.existsSync(configFileName) && !force) {
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
        { outputDirectory: '', scaffoldUrl: '' }
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

    const topText = `# Builda config file\r# This file is used to set up your 'builda' commands. Visit ${docSiteUrl}/setup for more information.`;

    fs.writeFileSync(
      configFileName,
      `${topText}\n\n${yaml.dump(config)}`,
      'utf8'
    );

    printMessage('Created config in project root', 'success');
    return printMessage(
      `Visit ${docSiteUrl}/setup for instructions on what to do next`,
      'notice'
    );
  });
};

export default init;
