export const pluralise = (input: string) => {
  const lastChar = input.charAt(input.length - 1);
  if (lastChar === 's') {
    return input;
  }
  return input + 's';
};

export default pluralise;
