"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_symbols_to_words_1 = require("../convert-symbols-to-words");
describe('normalizeCase() function', () => {
    test("should return 'my at component' when input is 'my @ component'", () => {
        const string = (0, convert_symbols_to_words_1.convertSymbolsToWords)('my @ component');
        expect(string).toEqual('my :At component');
    });
    test("should return 'my and component' when input is 'my & component'", () => {
        const string = (0, convert_symbols_to_words_1.convertSymbolsToWords)('my & component');
        expect(string).toEqual('my :And component');
    });
});
