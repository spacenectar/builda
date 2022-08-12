import printMessage from './print-message';

const skip = (type: string) =>
  printMessage(
    `Skipping generation of ${type} due to user selection`,
    'notice'
  );

export default skip;
