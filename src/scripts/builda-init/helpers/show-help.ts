import chalk from 'chalk';
import inquirer from 'inquirer';

export default (message: string, type?: string) => {
  const ui = new inquirer.ui.BottomBar();
  let tag = chalk.bold.white.bgBlue('   INFO   ');
  if (type === 'error') {
    tag = chalk.bold.white.bgRed('   ERROR   ');
  }
  if (type === 'success') {
    tag = chalk.bold.white.bgGreen('   SUCCESS   ');
  }
  if (type === 'warning') {
    tag = chalk.bold.white.bgYellow('   WARNING   ');
  }

  ui.log.write(`\n${tag}\n\n${chalk.white(message)}\n\n`);
};
