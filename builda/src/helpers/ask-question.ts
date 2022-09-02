import { QuestionType } from '@typedefs/question-type';
import inquirer from 'inquirer';
import type { Question } from 'inquirer';

interface Props {
  message?: string;
  type?: QuestionType;
  name?: string;
  defaultValue?: string;
  questionList?: Question[];
  validate?: (value: string) => boolean | string;
}

/**
 * Ask exactly one question to the user (saves boilerplating inquirer out each time)
 */
const askQuestion = ({
  message,
  type,
  name,
  defaultValue,
  questionList,
  validate
}: Props) => {
  if (questionList) {
    return inquirer.prompt(questionList);
  }
  if (!message || !name) {
    throw new Error(
      'Missing required arguments. Name and message are required.'
    );
  }
  return inquirer.prompt({
    type: type || 'input',
    name,
    message,
    default: defaultValue,
    validate
  });
};

export default askQuestion;
