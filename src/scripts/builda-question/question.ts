import inquirer from 'inquirer';

export type TQuestion = {
  /**
   * The questions to ask the user
   */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This comes from inquirer
  questions: inquirer.QuestionCollection<any>;
};

/**
 * Asks the user a series of questions, defined by the prefab,
 * @param { TQuestion }
 */
export default async ({ questions }: TQuestion) => {
  return inquirer.prompt(questions);
};
