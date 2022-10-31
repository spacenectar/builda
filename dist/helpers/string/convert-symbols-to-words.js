"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSymbolsToWords = void 0;
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
exports.default = exports.convertSymbolsToWords;
