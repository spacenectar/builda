/* eslint-disable @typescript-eslint/ban-ts-comment */
import chalk from 'chalk';
import { printLogo } from 'helpers';
import inquirer from 'inquirer';

export default (message: string, type?: string) => {
  console.clear();
  printLogo();
  const ui = new inquirer.ui.BottomBar();
  const consoleWidth = process.stdout.columns;

  type = type || 'info';

  let colour = 'bgBlue';
  let icon = '\u0069';

  if (type === 'error') {
    colour = 'bgRed';
    icon = '✖';
  }

  if (type === 'success') {
    colour = 'bgGreen';
    icon = '✔';
  }

  if (type === 'warning') {
    colour = 'bgYellow';
    icon = '⚠';
  }

  if (type === 'builda') {
    colour = 'bgMagenta';
    icon = 'B̳';
  }

  // @ts-ignore-implicit-any - chalk typings are wrong
  const iconTag = '  ' + chalk.bold.white[colour](`  ${icon}  `);
  const paddingLine =
    '  ' +
    // @ts-ignore-implicit-any - chalk typings are wrong
    chalk[colour](' '.repeat(5)) +
    ' ' +
    // @ts-ignore-implicit-any - chalk typings are wrong
    chalk[colour](' '.repeat(consoleWidth - 10)) +
    '\n';

  const tag =
    paddingLine +
    iconTag +
    ' ' +
    // @ts-ignore-implicit-any - chalk typings are wrong
    chalk.bold.white[colour](
      `  ${type.toUpperCase()}${' '.repeat(consoleWidth - type.length - 12)}\n`
    ) +
    paddingLine;

  // Create a horizontal line
  const line = chalk.white('─'.repeat(consoleWidth));

  // Find the last line break in the message and add a space after it
  const paddedMessage = message.replace(/\n/g, '\n  ');
  // If the message is longer than 20 characters before the console width, add a line break before the last whole word
  const wrappedMessage = paddedMessage.replace(
    new RegExp(`(.{${consoleWidth - 20}})(\\s|$)`, 'g'),
    '$1\n  '
  );

  ui.log.write(
    `\n${tag}\r\n  ${chalk.white(wrappedMessage)}\r\n\n${line}\r\n\n`
  );
};
