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
}

const askQuestion = ({ message, type, name }: Props) => {
  return inquirer.prompt({
    type: type || 'input',
    name,
    message
  });
};

export default askQuestion;
