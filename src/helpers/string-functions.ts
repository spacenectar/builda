export const detectCase = (input: string) => {
  const snakeCaseRegex = /^(?:[a-zA-Z]+_[a-zA-Z]+)+$/;
  const pascalCaseRegex = /^(?:[A-Z]{1}[a-zA-Z]+[A-Z]{1}[a-zA-Z]+)+$/;
  const camelCaseRegex = /^(?:[a-z]{1}[a-zA-Z]+[A-Z]{1}[a-zA-Z]+)+$/;
  const sentenceCaseRegex = /^(?:[a-zA-Z]+ [a-zA-Z]+)+$/;
  const kebabCaseRegex = /^(?:[a-zA-Z]+-[a-zA-Z]+)+$/;

  if (snakeCaseRegex.test(input)) {
    return 'snake';
  }
  if (pascalCaseRegex.test(input)) {
    return 'pascal';
  }
  if (camelCaseRegex.test(input)) {
    return 'camel';
  }
  if (sentenceCaseRegex.test(input)) {
    return 'sentence';
  }
  if (kebabCaseRegex.test(input)) {
    return 'kebab';
  }
  return 'unknown';
};

export const normalizeCase = (input: string) => {
  const caseType = detectCase(input);
  switch (caseType) {
    case 'snake':
      return input.replace(/_/g, ' ').toLowerCase();
    case 'pascal':
      return input
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join(' ');
    case 'camel':
      const words = input.split(/(?=[A-Z])/);
      const lowerCasedWords = words.slice(1).map((word) => word.toLowerCase());
      lowerCasedWords.unshift(words[0].toLowerCase());
      return lowerCasedWords.join(' ');
    case 'kebab':
      return input.replace(/-/g, ' ').toLowerCase();
    case 'sentence':
    default:
      return input;
  }
};

export const convertNumbersToWords = (input: string) => {
  const words = [
    'Zero',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine'
  ];

  const findNumbers = /\d+/g;

  const numbers = input.match(findNumbers);

  // Numbers found, replace them with words
  if (numbers) {
    const number = numbers[0];
    const numberAsWord = words[Number(number)];
    return input.replace(number, numberAsWord);
  }

  // No numbers found, return input
  return input;
};

export const convertSymbolsToWords = (input: string) => {
  return input
    .replace(/&/g, 'And')
    .replace(/@/g, 'At')
    .replace(/#/g, 'Hash')
    .replace(/\$/g, 'Dollar')
    .replace(/£/g, 'Pound')
    .replace(/%/g, 'Percent')
    .replace(/\+/g, 'Plus')
    .replace(/\*/g, 'Asterisk');
};

export const changeCase = (input: string, type: string) => {
  const str = input;

  const firstPass = convertSymbolsToWords(str);
  const secondPass = convertNumbersToWords(firstPass);

  const normalisedStr = normalizeCase(secondPass);
  const wordArray = normalisedStr.split(' ');

  switch (type) {
    case 'snakeCase':
      return wordArray.join('_').toLowerCase();
    case 'kebabCase':
      return wordArray.join('-').toLowerCase();
    case 'pascalCase':
      return wordArray
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    case 'camelCase':
      return wordArray
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toLowerCase() + word.slice(1);
          }
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join('');
    case 'sentenceCase':
    default:
      return wordArray
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word.charAt(0).toLowerCase() + word.slice(1);
        })
        .join(' ');
  }
};

export default changeCase;
