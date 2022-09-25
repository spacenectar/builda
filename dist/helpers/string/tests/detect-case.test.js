"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detect_case_1 = require("../detect-case");
describe('detect() function', () => {
    test("should return 'camel' when input is 'myComponent'", () => {
        const string = (0, detect_case_1.detectCase)('myComponent');
        expect(string).toEqual('camel');
    });
    test("should return 'kebab' when input is 'my-component'", () => {
        const string = (0, detect_case_1.detectCase)('my-component');
        expect(string).toEqual('kebab');
    });
    test("should return 'pascal' when input is 'MyComponent'", () => {
        const string = (0, detect_case_1.detectCase)('MyComponent');
        expect(string).toEqual('pascal');
    });
    test("should return 'snake' when input is 'my_component'", () => {
        const string = (0, detect_case_1.detectCase)('my_component');
        expect(string).toEqual('snake');
    });
    test("should return 'sentence' when input is 'my component'", () => {
        const string = (0, detect_case_1.detectCase)('my component');
        expect(string).toEqual('sentence');
    });
    test("should return 'sentence' when input is 'My Component'", () => {
        const string = (0, detect_case_1.detectCase)('My Component');
        expect(string).toEqual('sentence');
    });
    test("should return 'unknown' when input is '@My 3Component'", () => {
        const string = (0, detect_case_1.detectCase)('@My 3Component');
        expect(string).toEqual('unknown');
    });
});
