import fs from 'fs';
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

const getAnswers = () => {
  return new Promise(resolve => {
    askQuestion({
      questionList: questions as Question[]
    }).then(answers => {
      return resolve(answers);
    });
  })
};

const checkExistingConfig = (fileName: string, debug: boolean) => {
  return new Promise(resolve => {
    if (fs.existsSync(path.join(fileName))) {
      if (debug) {
        // Preset answers were passed so we are in debug/test mode
        return resolve(`You already have a ${fileName} file. Process Aborted.`);
      }
      return askQuestion(OVERWRITE_CONFIG_QUESTION).then(
        ({ replaceConfig }) => {
          if (replaceConfig) {
            return resolve('yes');
          }
          return 'Process terminated due to user selection';
        }
      );
    }
    printMessage('Starting initialisation...\r', 'success');
    return resolve('yes');
  });
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
  ? await checkExistingConfig(fileName, presetAnswers !== undefined) as string
  : 'yes';

  if (continueProcess === 'yes') {
    const answers = presetAnswers || await getAnswers() as Answers;

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

    fs.mkdirSync(buildaDir, { recursive: true });

    const contents = JSON.stringify(config, null, 2);

    return new Promise<void>(resolve => {
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
        resolve();
        return printMessage('Installing default scaffolds...\r', 'success');
      });

      return printMessage(
        `Visit ${websiteUrl}/setup for instructions on what to do next`,
        'notice'
      );
    });
  } else {
    throwError(continueProcess);
  }
};

export default init;
