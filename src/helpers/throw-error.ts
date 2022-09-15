import printMessage from './print-message';

export default (message: string) => {
  const newMessage = printMessage(message, 'danger', true) as string;
  throw new Error(newMessage);
};
