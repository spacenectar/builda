"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_numbers_to_words_1 = require("../../../helpers/string/convert-numbers-to-words");
describe('normalizeCase() function', () => {
    test("should return 'my three component' when input is 'my 3 component'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my 3 component');
        expect(string).toEqual('my :Three component');
    });
    test("should return 'my component four' when input is 'my component 4'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my component 4');
        expect(string).toEqual('my component :Four');
    });
});
