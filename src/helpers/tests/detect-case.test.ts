import { detectCase } from '@helpers/string-functions';

describe('detect() function', () => {
  test("should return 'camel' when input is 'myComponent'", () => {
    const string = detectCase('myComponent');
    expect(string).toEqual('camel');
  });
  test("should return 'kebab' when input is 'my-component'", () => {
    const string = detectCase('my-component');
    expect(string).toEqual('kebab');
  });
  test("should return 'pascal' when input is 'MyComponent'", () => {
    const string = detectCase('MyComponent');
    expect(string).toEqual('pascal');
  });
  test("should return 'snake' when input is 'my_component'", () => {
    const string = detectCase('my_component');
    expect(string).toEqual('snake');
  });
  test("should return 'sentence' when input is 'my component'", () => {
    const string = detectCase('my component');
    expect(string).toEqual('sentence');
  });
  test("should return 'sentence' when input is 'My Component'", () => {
    const string = detectCase('My Component');
    expect(string).toEqual('sentence');
  });
  test("should return 'unknown' when input is '@My 3Component'", () => {
    const string = detectCase('@My 3Component');
    expect(string).toEqual('unknown');
  });
});
