import { askQuestion } from 'helpers';
import questions from './questions';

export const getAnswers = async (
  omitName: boolean,
  omitPathName: boolean,
  omitYarnOrNpm: boolean
) => {
  return new Promise((resolve) => {
    const questionList = questions.filter((question) => {
      if (omitName && question.name === 'appName') {
        return false;
      }
      if (omitPathName && question.name === 'pathName') {
        return false;
      }
      if (omitYarnOrNpm && question.name === 'yarnOrNpm') {
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
