import chalk from 'chalk';

type Types =
  | 'error'
  | 'warning'
  | 'notice'
  | 'success'
  | 'primary'
  | 'secondary';

const printMessage = (message: string, type: Types) => {
  let newMessage = null;
  if (type && type === 'error') {
    newMessage = chalk.red(`🚨 ${message}`);
  }

  if (type && type === 'warning') {
    newMessage = chalk.yellow(`⚠️  ${message}`);
  }

  if (type && type === 'notice') {
    newMessage = chalk.blue(message);
  }

  if (type && type === 'success') {
    newMessage = chalk.green(`${message}`);
  }

  if (type && type === 'primary') {
    newMessage = chalk.magenta(`${message}`);
  }

  if (type && type === 'secondary') {
    newMessage = chalk.white(`${message}`);
  }

  if (!type) {
    newMessage = message;
  }
  return console.log(newMessage);
};

export default printMessage;
