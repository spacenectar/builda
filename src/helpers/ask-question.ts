import inquirer from 'inquirer';

interface Props {
  message: string;
  type?:
    | 'input'
    | 'number'
    | 'list'
    | 'confirm'
    | 'rawlist'
    | 'expand'
    | 'checkbox'
    | 'password';
  name: string;
  defaultValue?: string;
  validate?: (value: string) => boolean | string;
}

const askQuestion = ({
  message,
  type,
  name,
  defaultValue,
  validate
}: Props) => {
  return inquirer.prompt({
    type: type || 'input',
    name,
    message,
    default: defaultValue,
    validate
  });
};

export default askQuestion;
