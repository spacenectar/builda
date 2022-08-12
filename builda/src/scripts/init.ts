import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import { askQuestion, printMessage, throwError } from '@helpers';

import globals from '@data/globals';
import questions from '@data/questions';

const { configFileName, buildaDir, websiteUrl } = globals;

// Types
import { QuestionType } from '@typedefs/question-type';
import { Question } from 'inquirer';
import addModule from './add-module';

interface Answers {
  appName: string;
  outputDirectory: string;
  installDefaultModule: string;
  scaffoldUrl: string;
  scaffoldSelection: string[];
  customScaffoldList: string;
}

const OVERWRITE_CONFIG_QUESTION = {
  message: `Do you really want to replace your ${configFileName} file? You will lose all your current settings.`,
  name: 'replaceConfig',
  type: 'confirm' as QuestionType
};

const getAnswers = async () => {
  let answers = {} as Answers;
  try {
    await askQuestion({
      questionList: questions as unknown as Question[]
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
  if (fs.existsSync(path.join(buildaDir, fileName))) {
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
  printMessage('Starting initialisation...\r', 'success');
  return 'yes';
};

const init = async ({
  fileName = configFileName,
  presetAnswers = undefined,
  force = false
}: {
  fileName?: string;
  presetAnswers?: Answers;
  force?: boolean;
}) => {
  // Check if a config file already exists unless presetAnswers is passed
  const continueProcess = !force
    ? await checkExistingConfig(fileName, presetAnswers !== undefined)
    : 'yes';

  if (continueProcess === 'yes') {
    const answers = presetAnswers || (await getAnswers());

    if (!answers.appName) return throwError('App name is required');

    const scaffoldList = [];
    let module = '';

    // Install the default scaffolds
    if (answers.installDefaultModule === 'typescript') {
      printMessage('Installing default scaffolds...\r', 'success');
      module = 'default-ts';
    }
    if (answers.installDefaultModule === 'javascript') {
      // Install the default scaffolds
      module = 'default-js';
    }

    if (answers.installDefaultModule === 'custom') {
      // Install the default scaffolds
      module = answers.scaffoldUrl;
    }

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
        {
          type: 'scaffold',
          outputPath: `${answers.outputDirectory}/${scaffoldType}`,
          use: module,
          substitute: {}
        }
      ])
    );

    const config = {
      app: {
        name: answers.appName
      },
      commands
    };

    const topText = `# Builda config file\r# This file is used to set up your 'builda' commands. Visit ${websiteUrl}/setup for more information.`;

    fs.mkdirSync(buildaDir, { recursive: true });

    const configYaml = yaml.dump(config, { indent: 2 });

    const contents = `${topText}\r\n${configYaml}`;

    fs.writeFile(path.join(fileName), contents, async (err) => {
      if (err) throw err;
      printMessage('Created config in project root', 'success');
      if (answers.installDefaultModule === 'custom') {
        await addModule({path: answers.scaffoldUrl});
      }
      if (answers.installDefaultModule === 'typescript') {
        await addModule(
          {
            path: 'default-ts',
            official: true
          }
        );
      }
      if (answers.installDefaultModule === 'javascript') {
        await addModule(
          {
            path: 'default-js',
            official: true
          }
        );
      }
      printMessage('Installing default scaffolds...\r', 'success');
    });

    // prettier.format(path.join(buildaDir, fileName));

    return printMessage(
      `Visit ${websiteUrl}/setup for instructions on what to do next`,
      'notice'
    );
  } else {
    throwError(continueProcess);
  }
};

export default init;
