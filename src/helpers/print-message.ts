import chalk from 'chalk';

type Types = 'error' | 'warning' | 'notice' | 'success' | 'primary';

const printMessage = (message: string, type: Types) => {
  let newMessage = null;
  if (type && type === 'error') {
    newMessage = chalk.keyword('red')(`🚨 ${message}`);
  }

  if (type && type === 'warning') {
    newMessage = chalk.keyword('orange')(`⚠️  ${message}`);
  }

  if (type && type === 'notice') {
    newMessage = chalk.keyword('blue')(message);
  }

  if (type && type === 'success') {
    newMessage = chalk.keyword('green')(`${message}`);
  }

  if (type && type === 'primary') {
    newMessage = chalk.keyword('magenta')(`${message}`);
  }

  if (!type) {
    newMessage = message;
  }
  return console.log(newMessage);
};

export default printMessage;
