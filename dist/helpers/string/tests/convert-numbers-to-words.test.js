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
    test("should return 'my component :Eleven' when input is 'my component 11'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my component 11');
        expect(string).toEqual('my component :Eleven');
    });
    test("should return 'my component :FourtyThree' when input is 'my component 43'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my component 11');
        expect(string).toEqual('my component :Eleven');
    });
    test("should return 'my component :One:Hundred' when input is 'my component 100'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my component 100');
        expect(string).toEqual('my component :One:Hundred');
    });
    test("should return 'my component :One:Hundred:And:Fourty:Five' when input is 'my component 145'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my component 145');
        expect(string).toEqual('my component :One:Hundred:And:Fourty:Five');
    });
    test("should return 'my component :One:Thousand:One:Hundred:And:Fourty:Five' when input is 'my component 1145'", () => {
        const string = (0, convert_numbers_to_words_1.convertNumbersToWords)('my component 1145');
        expect(string).toEqual('my component :One:Thousand:One:Hundred:And:Fourty:Five');
    });
});
