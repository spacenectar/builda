import { normalizeCase } from '@helpers/string-functions';

describe('normalizeCase() function', () => {
  test("should return 'my component' when input is 'MyComponent'", () => {
    const string = normalizeCase('MyComponent');
    expect(string).toEqual('my component');
  });
  test("should return 'my component' when input is 'my-component'", () => {
    const string = normalizeCase('my-component');
    expect(string).toEqual('my component');
  });
  test("should return 'my component' when input is 'myComponent'", () => {
    const string = normalizeCase('myComponent');
    expect(string).toEqual('my component');
  });
  test("should return 'my component' when input is 'my component'", () => {
    const string = normalizeCase('my component');
    expect(string).toEqual('my component');
  });
  test("should return 'my component' when input is 'my_component'", () => {
    const string = normalizeCase('my_component');
    expect(string).toEqual('my component');
  });
});
