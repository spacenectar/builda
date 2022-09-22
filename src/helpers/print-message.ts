import chalk from 'chalk';
import process from 'process';
import rdl from 'readline';

const dots = {
  interval: 80,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
};

const std = process.stdout;
const stderr = process.stderr;

type Types =
  | 'error'
  | 'danger'
  | 'warning'
  | 'copying'
  | 'config'
  | 'downloading'
  | 'installing'
  | 'notice'
  | 'info'
  | 'success'
  | 'watch'
  | 'build'
  | 'run'
  | 'processing'
  | 'primary'
  | 'secondary';

let timer: NodeJS.Timeout | undefined = undefined;

const printMessage = (message: string, type: Types, returnstring?: boolean) => {
  let newMessage = null;
  if (type && type === 'error') {
    if (timer !== undefined) {
      clearInterval(timer);
    }
    newMessage = chalk.red(`🚨 ${message}`);
  }

  if (type && type === 'danger') {
    newMessage = chalk.red(`${message}`);
  }

  if (type && type === 'warning') {
    newMessage = chalk.yellow(`🔔 ${message}`);
  }

  if (type && type === 'config') {
    newMessage = chalk.blue(`🔧 ${message}`);
  }

  if (type && type === 'downloading') {
    newMessage = chalk.blue(`🌍 ${message}`);
  }

  if (type && type === 'copying') {
    newMessage = chalk.blue(`📂 ${message}`);
  }

  if (type && type === 'installing') {
    newMessage = chalk.blue(`📦 ${message}`);
  }

  if (type && type === 'notice') {
    newMessage = chalk.blue(`📝 ${message}`);
  }

  if (type && type === 'info') {
    newMessage =
      chalk.bgHex('#6699CC').white.bold(' \u0069 ') +
      ' ' +
      chalk.reset.blue(message);
  }

  if (type && type === 'success') {
    if (timer !== undefined) {
      clearInterval(timer);
    }
    newMessage = chalk.green(`✅ ${message}`);
  }

  if (type && type === 'watch') {
    newMessage = chalk.magenta(`👀 ${message}`);
  }

  if (type && type === 'build') {
    newMessage = chalk.magenta(`🏗 ${message}`);
  }

  if (type && type === 'run') {
    newMessage = chalk.magenta(`🏃 ${message}`);
  }

  if (type && type === 'primary') {
    newMessage = chalk.magenta(`${message}`);
  }

  if (type && type === 'secondary') {
    newMessage = chalk.white(`${message}`);
  }

  if (type && type === 'processing') {
    // Create a spinner
    const spin = dots;
    const spinnerFrames = spin.frames;
    const spinnerTimeInterval = spin.interval;
    let index = 0;
    if (timer !== undefined) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      let now = spinnerFrames[index];
      if (now == undefined) {
        index = 0;
        now = spinnerFrames[index];
      }
      rdl.clearLine(std, 0);
      rdl.cursorTo(std, 0);
      std.write(now);
      index = index >= spinnerFrames.length ? 0 : index + 1;
    }, spinnerTimeInterval);
    newMessage = chalk.blue(`${message}`);
  }

  if (!type) {
    newMessage = message;
  }

  const returnType = type === 'error' ? stderr : std;

  return returnstring ? newMessage : returnType.write(`${newMessage}\n`);
};

export default printMessage;
