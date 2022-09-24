"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralise = exports.changeCase = exports.convertSymbolsToWords = exports.convertNumbersToWords = exports.normalizeCase = exports.detectCase = void 0;
const detectCase = (input) => {
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
exports.detectCase = detectCase;
const removeExtraSpaces = (input) => {
    return input.replace(/\s{2,}/g, ' ').trim();
};
const normalizeCase = (input) => {
    const caseType = (0, exports.detectCase)(input);
    const words = input.split(/(?=[A-Z:])/).filter((word) => word !== ':');
    const lowerCasedWords = words.slice(1).map((word) => word.toLowerCase());
    if (caseType === 'snake') {
        const str = input.replace(/_/g, ' ').toLowerCase().replace(/:/g, ' ');
        return removeExtraSpaces(str);
    }
    if (caseType === 'pascal') {
        const str = input
            .split(/(?=[A-Z])/)
            .map((word) => word.toLowerCase())
            .join(' ')
            .replace(/:/g, ' ');
        return removeExtraSpaces(str);
    }
    if (caseType === 'camel') {
        lowerCasedWords.unshift(words[0].toLowerCase());
        const str = lowerCasedWords.join(' ');
        return removeExtraSpaces(str);
    }
    if (caseType === 'kebab') {
        const str = input.replace(/-/g, ' ').replace(/:/g, ' ').toLowerCase();
        return removeExtraSpaces(str);
    }
    if (caseType === 'sentence') {
        return removeExtraSpaces(input.replace(/:/g, ''));
    }
    return input;
};
exports.normalizeCase = normalizeCase;
const convertNumbersToWords = (input) => {
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
        const numberString = individualNumbers
            .map((number) => {
            const numberIndex = parseInt(number, 10);
            return words[numberIndex];
        })
            .join('');
        return input.replace(findNumbers, numberString);
    }
    // No numbers found, return input
    return input;
};
exports.convertNumbersToWords = convertNumbersToWords;
const convertSymbolsToWords = (input) => {
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
exports.convertSymbolsToWords = convertSymbolsToWords;
const changeCase = (input, type) => {
    const str = input;
    const firstPass = (0, exports.convertSymbolsToWords)(str);
    const secondPass = (0, exports.convertNumbersToWords)(firstPass);
    const normalisedStr = (0, exports.normalizeCase)(secondPass);
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
exports.changeCase = changeCase;
const pluralise = (input) => {
    const lastChar = input.charAt(input.length - 1);
    if (lastChar === 's') {
        return input;
    }
    return input + 's';
};
exports.pluralise = pluralise;
exports.default = exports.changeCase;
