import { convertRegistryPathToUrl } from '../convert-registry-path-to-url';

describe('convertRegistryPathToUrl() function', () => {
  test('should return a raw path to a registry.json file when a github repo folder path is provided', () => {
    const registryPath =
      'https://github.com/st-elmos-fire/builda/tree/master/scaffolds/component-with-storybook';
    const expected =
      'https://raw.githubusercontent.com/st-elmos-fire/builda/master/scaffolds/component-with-storybook';
    expect(convertRegistryPathToUrl(registryPath)).toEqual(expected);
  });

  test('should return a raw path to a registry.json file when a bitbucket repo folder path is provided', () => {
    const registryPath =
      'https://bitbucket.org/alexfoxleigh1981/scaffolds/src/master/component-with-storybook/';
    const expected =
      'https://bitbucket.org/alexfoxleigh1981/scaffolds/raw/master/component-with-storybook';
    expect(convertRegistryPathToUrl(registryPath)).toEqual(expected);
  });

  test('Should return a path to a registry.json when a custom matcher is provided', () => {
    const customMatcher = {
      original:
        'https:\\/\\/(bitbucket.custom.url)\\/projects\\/([\\w\\d-]+){1}\\/repos\\/([\\w\\d-]+){1}\\/browse\\/([\\w\\d-]+)+',
      transformed: 'https://$1/projects/$2/repos/$3/raw/master/$4'
    };
    const registryPath =
      'https://bitbucket.custom.url/projects/BULDA/repos/component-library/browse/components/';
    const expected =
      'https://bitbucket.custom.url/projects/BULDA/repos/component-library/raw/master/components';
    expect(convertRegistryPathToUrl(registryPath, customMatcher)).toEqual(
      expected
    );
  });
});
