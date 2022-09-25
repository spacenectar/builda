import { convertNumbersToWords } from 'helpers/string/convert-numbers-to-words';

describe('normalizeCase() function', () => {
  test("should return 'my three component' when input is 'my 3 component'", () => {
    const string = convertNumbersToWords('my 3 component');
    expect(string).toEqual('my :Three component');
  });
  test("should return 'my component four' when input is 'my component 4'", () => {
    const string = convertNumbersToWords('my component 4');
    expect(string).toEqual('my component :Four');
  });
});
