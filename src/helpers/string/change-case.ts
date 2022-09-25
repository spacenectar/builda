import { convertNumbersToWords } from './convert-numbers-to-words';
import { normalizeCase } from './normalise-case';
import { convertSymbolsToWords } from './convert-symbols-to-words';

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
