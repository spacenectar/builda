"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluralise = void 0;
const pluralise = (input) => {
    const lastChar = input.charAt(input.length - 1);
    if (lastChar === 's') {
        return input;
    }
    return input + 's';
};
exports.pluralise = pluralise;
exports.default = exports.pluralise;
