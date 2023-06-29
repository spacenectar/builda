import inquirer from 'inquirer';

/**
 * Asks the user a series of questions, defined by the prefab
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- This comes from inquirer
export default async (questions: inquirer.QuestionCollection<any>) => {
  return inquirer.prompt(questions);
};
