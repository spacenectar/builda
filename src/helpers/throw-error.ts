import printMessage from './print-message';

export default (message: string) => {
  printMessage(message, 'error');
  return process.exit(1);
};
