import fs from 'node:fs';
import path from 'node:path';

import { askQuestion, printMessage, throwError } from '@helpers';
import { pluralise } from '@helpers/string-functions';

import addModule from './add-module';

import globals from '@data/globals';
import questions from '@data/questions';

const { configFileName, buildaDir, websiteUrl } = globals;

// Types
import { QuestionType } from '@typedefs/question-type';
import { Question } from 'inquirer';
import { ConfigFile } from '@typedefs/config-file';
import BlueprintScriptConfig, {
  BlueprintScriptContent
} from '@typedefs/blueprint-script-config';

interface Answers {
  appName: string;
  outputDirectory: string;
  installDefaultModule: string;
  blueprintUrl: string;
  blueprintSelection: string[];
  customBlueprintList: string;
}

const configFilePath = path.join(buildaDir, configFileName);

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

const checkExistingConfig = async (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(configFilePath)) {
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

const installModules = async (config: ConfigFile, answers: Answers) => {
  printMessage('Installing initial blueprint...\r', 'notice');
  let options = {
    config,
    path: answers.installDefaultModule,
    official: true
  };

  if (answers.installDefaultModule === 'custom') {
    options = {
      config,
      path: answers.blueprintUrl,
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
  const blueprintList: string[] = [];
  let answers = {} as Answers;

  if (!presetAnswers) {
    try {
      continueProcess = await checkExistingConfig();
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

      if (answers.blueprintSelection?.length) {
        blueprintList.push(...answers.blueprintSelection);
      }

      if (answers.customBlueprintList) {
        answers.customBlueprintList
          .split(',')
          .forEach((blueprintType: string) => {
            blueprintList.push(blueprintType.trim());
          });
      }
      const config = {
        name: appName,
        app_root: outputDirectory
      } as ConfigFile;

      installModules(config, answers)
        .then((response) => {
          const blueprintScripts = {} as BlueprintScriptConfig<
            Omit<BlueprintScriptContent, 'substitute'>
          >;

          blueprintList.forEach((blueprintItem) => {
            blueprintScripts[blueprintItem] = {
              use: response.module.name,
              output_dir: `{{app_root}}/${pluralise(blueprintItem)}`
            };
          });

          const configString = { ...config };
          configString.blueprint_scripts = {
            ...configString.blueprint_scripts,
            ...blueprintScripts
          };

          writeConfig(configFilePath, JSON.stringify(configString, null, 2))
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
