"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertNumbersToWords = void 0;
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
exports.default = exports.convertNumbersToWords;
