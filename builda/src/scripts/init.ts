import fs from 'fs';
import path from 'path';

import { askQuestion, printMessage, throwError } from '@helpers';
import { pluralise } from '@helpers/string-functions';

import globals from '@data/globals';
import questions from '@data/questions';

const { configFileName, buildaDir, websiteUrl } = globals;

// Types
import { QuestionType } from '@typedefs/question-type';
import { Question } from 'inquirer';
import addModule from './add-module';
import { ConfigFile } from '@typedefs/config-file';
import TSubstitution from '@typedefs/substitution';

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
  return new Promise((resolve) => {
    askQuestion({
      questionList: questions as Question[]
    }).then((answers) => {
      return resolve(answers);
    });
  });
};

const checkExistingConfig = async (
  fileName: string,
  debug: boolean
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path.join(fileName))) {
      if (debug) {
        // Preset answers were passed so we are in debug/test mode
        reject(false);
        return throwError(
          `You already have a ${fileName} file. Process Aborted.`
        );
      }
      return askQuestion(OVERWRITE_CONFIG_QUESTION).then(
        ({ replaceConfig }) => {
          if (replaceConfig) {
            return resolve(true);
          }
          reject(false);
          return throwError('Process terminated due to user selection');
        }
      );
    }
    printMessage('Starting initialisation...\r', 'success');
    printMessage(
      `All answers can be changed later by editing the ${configFileName} file`,
      'notice'
    );
    return resolve(true);
  });
};

const writeConfig = async (filename: string, contents: string) => {
  return new Promise((resolve) => {
    fs.writeFile(filename, contents, (err) => {
      if (err) throw err;
      return resolve(printMessage('Created config in project root', 'success'));
    });
  });
};

const installModules = async (config: Partial<ConfigFile>, answers: Answers)  => {
  printMessage('Installing initial scaffold...\r', 'notice');
  let options = {
    config,
    path: answers.installDefaultModule,
    official: true
  };

  if (answers.installDefaultModule === 'custom') {
    options = {
      config,
      path: answers.scaffoldUrl,
      official: false
    };
  }
  return addModule(options);
};

const init = async ({ presetAnswers }: { presetAnswers?: Answers }) => {
  // Check if a config file already exists unless presetAnswers is passed
  let continueProcess = false;
  const scaffoldList: string[] = [];
  let answers = {} as Answers;

  if (!presetAnswers) {
    try {
      continueProcess = await checkExistingConfig(configFileName, false);
    } catch (err) {
      Promise.reject(err);
      return throwError(err);
    }
    try {
      answers = (await getAnswers()) as Answers;
    } catch (err) {
      Promise.reject(err);
      throwError(err);
    }
  } else {
    continueProcess = true;
    answers = presetAnswers;
  }

  if (!answers.appName) {
    Promise.reject('No app name provided');
    return throwError('App name is required');
  }

  return new Promise<void>(async (resolve, reject) => {
    if (continueProcess === true) {
      fs.mkdirSync(buildaDir, { recursive: true });

      if (answers.scaffoldSelection?.length) {
        scaffoldList.push(...answers.scaffoldSelection);
      }

      if (answers.customScaffoldList) {
        answers.customScaffoldList
          .split(',')
          .forEach((scaffoldType: string) => {
            scaffoldList.push(scaffoldType.trim());
          });
      }
      const config = {
        app: {
          name: answers.appName
        }
      } as ConfigFile;

      await installModules(config, answers).then((response) => {

        const subs = response?.module?.substitute || [];

        const commandList = scaffoldList.map((scaffoldType: string) => [
          scaffoldType,
          {
            type: 'scaffold',
            outputPath: `${answers.outputDirectory}/${pluralise(scaffoldType)}`,
            use: response.module.name,
            substitute: subs.map((sub: TSubstitution) => {
              return {
                replace: sub.replace,
                with: sub.with || scaffoldType
              }
            }) || []
          }
        ]);

        const commands = Object.fromEntries(commandList);

        const updatedConfig = {
          ...response.config,
          commands
        };

        const configString = JSON.stringify(updatedConfig, null, 2);
        writeConfig(configFileName, configString).then(() => {
            printMessage('\rInitialisation complete', 'success');
            printMessage(
              `Visit ${websiteUrl}/setup for instructions on what to do next`,
              'notice'
            );
            resolve();
          }).catch((err) => {
            reject(err);
            throwError(err);
          });
      }).catch((err) => {
        reject(err);
        throwError(err);
      });
    }
  });
};

export default init;
