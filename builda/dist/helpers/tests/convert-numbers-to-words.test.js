"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_functions_1 = require("../string-functions");
describe('normalizeCase() function', () => {
    test("should return 'my three component' when input is 'my 3 component'", () => {
        const string = (0, string_functions_1.convertNumbersToWords)('my 3 component');
        expect(string).toEqual('my :Three component');
    });
    test("should return 'my component four' when input is 'my component 4'", () => {
        const string = (0, string_functions_1.convertNumbersToWords)('my component 4');
        expect(string).toEqual('my component :Four');
    });
});
