import detectPathType from '../detect-path-type';

describe('detectPathType', () => {
  test("should return 'local' when a local path is provided", () => {
    const path = './src/helpers/detect-path-type.ts';
    const expected = 'local';
    expect(detectPathType(path)).toEqual(expected);
  });

  test("should return 'remote' when a remote path is provided", () => {
    const path =
      'https://raw.githubusercontent.com/st-elmos-fire/builda/master/scaffolds/component-with-storybook/registry.json';
    const expected = 'remote';
    expect(detectPathType(path)).toEqual(expected);
  });
});
