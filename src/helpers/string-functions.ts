export const detectCase = (input: string) => {
  const snakeCaseRegex = /^(?:[a-zA-Z:]+_[a-zA-Z:]+)+$/;
  const pascalCaseRegex = /^(?:[A-Z]{1}[a-zA-Z:]+[A-Z]{1}[a-zA-Z:]+)+$/;
  const camelCaseRegex = /^(?:[a-z]{1}[a-zA-Z:]+[A-Z]{1}[a-zA-Z:]+)+$/;
  const sentenceCaseRegex = /^(?:[a-zA-Z:]+ [a-zA-Z:]+)+$/;
  const kebabCaseRegex = /^(?:[a-zA-Z:]+-[a-zA-Z:]+)+$/;

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
  const words = input.split(/(?=[A-Z:])/).filter((word) => word !== ':');
  const lowerCasedWords = words.slice(1).map((word) => word.toLowerCase());
  switch (caseType) {
    case 'snake':
      return input.replace(/_/g, ' ').toLowerCase().replace(/:/g, ' ');
    case 'pascal':
      return input
        .split(/(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join(' ');
    case 'camel':
      lowerCasedWords.unshift(words[0].toLowerCase());
      return lowerCasedWords.join(' ');
    case 'kebab':
      return input.replace(/-/g, ' ').replace(/:/g, ' ').toLowerCase();
    case 'sentence':
    default:
      return input.replace(/:/g, '');
  }
};

export const convertNumbersToWords = (input: string) => {
  const words = [
    ':Zero',
    ':One',
    ':Two',
    ':Three',
    ':Four',
    ':Five',
    ':Six',
    ':Seven',
    ':Eight',
    ':Nine'
  ];

  const findNumbers = /\d+/g;

  const numbers = input.match(findNumbers);
  const individualNumbers = numbers ? numbers[0].split('') : [];
  if (individualNumbers) {
    const numberString = individualNumbers.map((number) => {
      const numberIndex = parseInt(number, 10);
      return words[numberIndex];
    }).join('');
    return input.replace(findNumbers, numberString);
  }
  // No numbers found, return input
  return input;
};

export const convertSymbolsToWords = (input: string) => {
  return input
    .replace(/&/g, ':And')
    .replace(/@/g, ':At')
    .replace(/#/g, ':Hash')
    .replace(/\$/g, ':Dollar')
    .replace(/£/g, ':Pound')
    .replace(/%/g, ':Percent')
    .replace(/\+/g, ':Plus')
    .replace(/\*/g, ':Asterisk');
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

export const pluralise = (input: string) => {
  const lastChar = input.charAt(input.length - 1);
  if (lastChar === 's') {
    return input;
  }
  return input + 's';
}

export default changeCase;
