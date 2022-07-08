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

// Types
import { QuestionType } from '@typedefs/question-type';

interface Answers {
  appName: string;
  outputDirectory: string;
  scaffoldUrl: string;
  scaffoldSelection: string[];
  customScaffoldList: string;
}

const OVERWRITE_CONFIG_QUESTION = {
  message: 'Do you really want to replace your .builda.yml file?',
  name: 'replaceConfig',
  type: 'confirm' as QuestionType
};

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

const checkExistingConfig = async (fileName: string, debug: boolean) => {
  if (fs.existsSync(fileName)) {
    if (debug) {
      // Preset answers were passed so we are in debug/test mode
      return `You already have a ${fileName} file. Process Aborted.`;
    }
    return await askQuestion(OVERWRITE_CONFIG_QUESTION).then(
      ({ replaceConfig }) => {
        if (replaceConfig) {
          return 'yes';
        }
        return 'Process terminated due to user selection';
      }
    );
  }
  printMessage(
    'No .builda.yml file detected. Starting initialisation...\r',
    'success'
  );
  return 'yes';
};

const init = async ({
  fileName = configFileName,
  presetAnswers,
  force = false
}: {
  fileName?: string;
  presetAnswers?: Answers;
  force?: boolean;
}) => {
  // Check if a config file already exists unless presetAnswers is passed
  const continueProcess = !force
    ? await checkExistingConfig(fileName, !!presetAnswers)
    : 'yes';

  if (continueProcess === 'yes') {
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

    const commands = Object.fromEntries(
      scaffoldList.map((scaffoldType: string) => [
        scaffoldType,
        { type: 'scaffold', outputDirectory: '', scaffoldUrl: '' }
      ])
    );

    const config = {
      app: {
        name: answers.appName,
        outputDirectory: answers.outputDirectory,
        scaffoldUrl: answers.scaffoldUrl
      },
      commands
    };

    const topText = `# Builda config file\r# This file is used to set up your 'builda' commands. Visit ${docSiteUrl}/setup for more information.`;

    fs.writeFileSync(fileName, `${topText}\n\n${yaml.dump(config)}`, 'utf8');

    printMessage('Created config in project root', 'success');
    return printMessage(
      `Visit ${docSiteUrl}/setup for instructions on what to do next`,
      'notice'
    );
  } else {
    throwError(continueProcess);
  }
};

export default init;
