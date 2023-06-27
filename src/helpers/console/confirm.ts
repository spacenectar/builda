import chalk from 'chalk';
import process from 'process';
import rdl from 'readline';

// Adds a confirm prompt with a custom message and
// returns a promise that resolves to a boolean

export const confirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const rl = rdl.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question(chalk.blue(`🤔 ${message} [y/N] `), (answer: string) => {
      answer = answer.toLowerCase();
      rl.close();
      if (answer === 'y') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export default confirm;
