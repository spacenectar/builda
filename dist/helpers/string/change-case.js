"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCase = void 0;
const convert_numbers_to_words_1 = require("./convert-numbers-to-words");
const normalise_case_1 = require("./normalise-case");
const convert_symbols_to_words_1 = require("./convert-symbols-to-words");
const changeCase = (input, type) => {
    const str = input;
    const firstPass = (0, convert_symbols_to_words_1.convertSymbolsToWords)(str);
    const secondPass = (0, convert_numbers_to_words_1.convertNumbersToWords)(firstPass);
    const normalisedStr = (0, normalise_case_1.normalizeCase)(secondPass);
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
        case 'titleCase':
            return wordArray
                .map((word) => {
                return word.charAt(0).toUpperCase() + word.slice(1);
             })
                .join(' ');
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
exports.changeCase = changeCase;
exports.default = exports.changeCase;
