import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

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

const getAnswers = async (omitName: boolean, omitOutputDir: boolean) => {
  return new Promise((resolve) => {
    const questionList: Question[] = questions.filter((question) => {
      if (omitName && question.name === 'appName') {
        return false;
      }
      if (omitOutputDir && question.name === 'outputDirectory') {
        return false;
      }
      return true;
    });

    askQuestion({
      questionList
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

const installModules = async (
  config: Partial<ConfigFile>,
  answers: Answers
) => {
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

type TInitOptions = {
  presetAnswers?: Answers;
  appName?: string;
  outputDirectory?: string;
};

const init = async ({
  presetAnswers,
  appName: applicationName,
  outputDirectory: outputDir
}: TInitOptions) => {
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
      answers = (await getAnswers(!!applicationName, !!outputDir)) as Answers;
    } catch (err) {
      Promise.reject(err);
      throwError(err);
    }
  } else {
    continueProcess = true;
    answers = presetAnswers;
  }

  const appName = applicationName || answers.appName;
  const outputDirectory = outputDir || answers.outputDirectory;

  if (!appName) {
    Promise.reject('No app name provided');
    return throwError('App name is required');
  }

  return new Promise<void>((resolve, reject) => {
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
        name: appName,
        app_root: outputDirectory
      } as ConfigFile;

      installModules(config, answers)
        .then((response) => {
          let scaffoldScripts = ``;

          scaffoldList.forEach((scaffoldItem) => {
            scaffoldScripts += `${scaffoldItem}: {\n`;
            scaffoldScripts += `  use: '${response.module.name}',\n`;
            scaffoldScripts += `output_dir: \`\${appRoot}/${pluralise(
              scaffoldItem
            )}\`,\n`;
            scaffoldScripts += `},\n`;
          });

          let configString = `\nconst appRoot = '${outputDirectory}';\n\n`;
          configString += `module.exports = {\n`;
          configString += `  name: '${appName}',\n`;
          configString += `  app_root: appRoot,\n`;
          configString += `  scaffold_scripts: {\n${scaffoldScripts}},\n`;
          configString += `}`;

          writeConfig(
            configFileName,
            prettier.format(configString, {
              singleQuote: true,
              trailingComma: 'none',
              parser: 'typescript'
            })
          )
            .then(() => {
              printMessage('\rInitialisation complete', 'success');
              printMessage(
                `Check your ${configFileName} file to ensure all settings are correct. Output paths may need some tweaking.`,
                'notice'
              );
              printMessage(
                `Visit ${websiteUrl}/setup for instructions on what to do next`,
                'notice'
              );
              resolve();
            })
            .catch((err) => {
              reject(err);
              throwError(err);
            });
        })
        .catch((err) => {
          reject(err);
          throwError(err);
        });
    }
  });
};

export default init;
