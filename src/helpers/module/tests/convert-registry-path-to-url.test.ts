import { ConfigFile } from 'types/config-file';
import { getConfigFile } from 'helpers';
import { convertRegistryPathToUrl } from '../convert-registry-path-to-url';

describe('convertRegistryPathToUrl http urls', () => {
  test('should return a raw path to a registry.json file when a github repo folder path is provided', () => {
    const registryPath =
      'https://github.com/test-path/builda/tree/master/blueprints/component-with-storybook';
    const expected =
      'https://raw.githubusercontent.com/test-path/builda/master/blueprints/component-with-storybook';
    expect(convertRegistryPathToUrl({ registryPath }).url).toEqual(expected);
  });

  test('should return a raw path to a registry.json file when a bitbucket repo folder path is provided', () => {
    const registryPath =
      'https://bitbucket.org/builda/blueprints/src/master/component-with-storybook';
    const expected =
      'https://bitbucket.org/builda/blueprints/raw/master/component-with-storybook';
    expect(convertRegistryPathToUrl({ registryPath }).url).toEqual(expected);
  });

  test('should return a path to a registry.json file when a non-matching http or https url is provided', () => {
    const registryPath = 'http://test.com/blah';
    const expected = 'http://test.com/blah';
    expect(convertRegistryPathToUrl({ registryPath }).url).toEqual(expected);
  });
});

describe('convertRegistryPathToUrl resolver urls', () => {
  let config = {} as ConfigFile;
  beforeAll(async () => {
    config = (await getConfigFile()) as ConfigFile;
  });

  test('should return a path to a registry.json file on the builda repository when builda: is provided', () => {
    const registryPath = 'builda:blueprint-default-js';
    const expected = 'https://builda.app/modules/blueprint-default-js/latest';
    expect(convertRegistryPathToUrl({ registryPath }).url).toEqual(expected);
  });

  test('should return a raw path to a registry.json file when a bitbucket resolver is provided', () => {
    const registryPath = 'bitbucket:builda/blueprints@1.1.0';
    const expected = 'https://bitbucket.org/builda/blueprints/raw/1.1.0';
    expect(convertRegistryPathToUrl({ registryPath }).url).toEqual(expected);
  });

  test('should return a raw path to a registry.json file when a bitbucket resolver is provided and preovid the correct version number', () => {
    const registryPath = 'bitbucket:builda@v1.1.0';
    const expected = 'https://bitbucket.org/builda/raw/v1.1.0';
    expect(convertRegistryPathToUrl({ registryPath }).url).toEqual(expected);
  });

  test('Should return a path to a registry.json when a custom matcher is provided', () => {
    const customConfig = {
      ...config,
      resolvers: {
        bbcustom:
          'https://bitbucket.custom.url/projects/builda/repos/%REPO_NAME%/raw/%FILE_NAME%?at=refs/tags/%VERSION%'
      }
    } as ConfigFile;

    const registryPath = 'bbcustom:component-library@6.7.1';
    const expected =
      'https://bitbucket.custom.url/projects/builda/repos/component-library/raw/%FILE_NAME%?at=refs/tags/6.7.1';
    expect(
      convertRegistryPathToUrl({ registryPath, config: customConfig }).url
    ).toEqual(expected);
  });
});

describe('convertRegistryPathToUrl failure paths', () => {
  test('Should return an error, if an invalid url is entered', () => {
    const registryPath = 'test.com/blah';
    const runner = convertRegistryPathToUrl({ registryPath });
    expect(runner).toEqual({
      url: '',
      error:
        'Paths must start with a colon terminated lowercase string with no spaces or special characters (e.g. "builda:" or "([a-z]+:{1}[/]{0})" ) if using a resolver or "http(s)" if using a url'
    });
  });

  test('Should return an error, if an unknown resolver is used', () => {
    const registryPath = 'unknown:blah';
    const runner = convertRegistryPathToUrl({ registryPath });
    expect(runner).toEqual({
      url: '',
      error: 'Could not find a resolver for unknown:blah'
    });
  });
});
