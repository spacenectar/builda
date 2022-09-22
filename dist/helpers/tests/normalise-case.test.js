"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_functions_1 = require("../../helpers/string-functions");
describe('normalizeCase() function', () => {
    test("should return 'my component' when input is 'MyComponent'", () => {
        const string = (0, string_functions_1.normalizeCase)('MyComponent');
        expect(string).toEqual('my component');
    });
    test("should return 'my component' when input is 'my-component'", () => {
        const string = (0, string_functions_1.normalizeCase)('my-component');
        expect(string).toEqual('my component');
    });
    test("should return 'my component' when input is 'myComponent'", () => {
        const string = (0, string_functions_1.normalizeCase)('myComponent');
        expect(string).toEqual('my component');
    });
    test("should return 'my component' when input is 'my component'", () => {
        const string = (0, string_functions_1.normalizeCase)('my component');
        expect(string).toEqual('my component');
    });
    test("should return 'my component' when input is 'my_component'", () => {
        const string = (0, string_functions_1.normalizeCase)('my_component');
        expect(string).toEqual('my component');
    });
});
