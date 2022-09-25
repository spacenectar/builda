"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCase = void 0;
const detect_case_1 = require("./detect-case");
const removeExtraSpaces = (input) => {
    return input.replace(/\s{2,}/g, ' ').trim();
};
const normalizeCase = (input) => {
    const caseType = (0, detect_case_1.detectCase)(input);
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
exports.default = exports.normalizeCase;
