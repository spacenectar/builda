import returnMessage from './return-message';

const skip = (type: string) =>
  returnMessage(
    `Skipping generation of ${type} due to user selection`,
    'notice'
  );

export default skip;
