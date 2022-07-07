import fs from 'fs';
import { Question } from 'inquirer';
import yaml from 'js-yaml';

import {
  globals,
  askQuestion,
  printMessage,
  questions,
  throwError
} from '@helpers';

const { configFileName, docSiteUrl } = globals;
interface Answers {
  appName: string;
  outputDirectory: string;
  scaffoldUrl: string;
  scaffoldSelection: string[];
  customScaffoldList: string;
}

const getAnswers = async () => {
  let answers = {} as Answers;
  try {
    await askQuestion({
      questionList: questions as Array<Question>
    }).then((res) => {
      answers = res as Answers;
    });
  } catch (error) {
    printMessage(error.message, 'error');
  } finally {
    return answers;
  }
};

const init = async ({
  force,
  fileName = configFileName,
  presetAnswers
}: {
  force?: boolean;
  fileName?: string;
  presetAnswers?: Answers;
}) => {
  if (fs.existsSync(fileName) && !force) {
    throwError(`You already have a ${fileName} file. Process Aborted.`);
  }

  if (fs.existsSync('.buildcomrc')) {
    printMessage('.buildcomrc file detected.', 'error');
    printMessage('Please note:', 'notice');
    printMessage(
      '   Builda and Buildcom are very different packages.\n   It is advised you either delete the file or continue to use the legacy buildcom package.\n',
      'secondary'
    );
    throwError(
      'Please delete the .buildcomrc file and try again. Process Aborted.'
    );
  }

  const answers = presetAnswers || (await getAnswers());

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

  fs.writeFileSync(fileName, `${topText}\n\n${yaml.dump(config)}`, 'utf8');

  printMessage('Created config in project root', 'success');
  return printMessage(
    `Visit ${docSiteUrl}/setup for instructions on what to do next`,
    'notice'
  );
};

export default init;
