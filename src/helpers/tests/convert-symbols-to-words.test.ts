import { convertSymbolsToWords } from '@helpers/string-functions';

describe('normalizeCase() function', () => {
  test("should return 'my at component' when input is 'my @ component'", () => {
    const string = convertSymbolsToWords('my @ component');
    expect(string).toEqual('my :At component');
  });
  test("should return 'my and component' when input is 'my & component'", () => {
    const string = convertSymbolsToWords('my & component');
    expect(string).toEqual('my :And component');
  });
});
