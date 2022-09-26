"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../../helpers");
const convert_registry_path_to_url_1 = require("../convert-registry-path-to-url");
describe('convertRegistryPathToUrl http urls', () => {
    test('should return a raw path to a registry.json file when a github repo folder path is provided', () => {
        const registryPath = 'https://github.com/test-path/builda/tree/master/blueprints/component-with-storybook';
        const expected = 'https://raw.githubusercontent.com/test-path/builda/master/blueprints/component-with-storybook';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath }).url).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a bitbucket repo folder path is provided', () => {
        const registryPath = 'https://bitbucket.org/builda/blueprints/src/master/component-with-storybook';
        const expected = 'https://bitbucket.org/builda/blueprints/raw/master/component-with-storybook';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath }).url).toEqual(expected);
    });
    test('should return a path to a registry.json file when a non-matching http or https url is provided', () => {
        const registryPath = 'http://test.com/blah';
        const expected = 'http://test.com/blah';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath }).url).toEqual(expected);
    });
});
describe('convertRegistryPathToUrl resolver urls', () => {
    let config = {};
    beforeAll(async () => {
        config = (await (0, helpers_1.getConfigFile)());
    });
    test('should return a path to a registry.json file on the builda repository when builda: is provided', () => {
        const registryPath = '$builda:blueprint-default-js';
        const expected = 'https://builda.app/modules/blueprint-default-js/latest';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath }).url).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a bitbucket resolver is provided', () => {
        const registryPath = '$bitbucket:builda/blueprints@1.1.0';
        const expected = 'https://bitbucket.org/builda/blueprints/raw/1.1.0';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath }).url).toEqual(expected);
    });
    test('Should return a path to a registry.json when a custom matcher is provided', () => {
        const customConfig = Object.assign(Object.assign({}, config), { resolvers: {
                bbcustom: 'https://bitbucket.custom.url/projects/builda/repos/%REPO_NAME%/raw/%FILE_NAME%?at=refs/tags/%VERSION%'
            } });
        const registryPath = '$bbcustom:component-library@6.7.1';
        const expected = 'https://bitbucket.custom.url/projects/builda/repos/component-library/raw/%FILE_NAME%?at=refs/tags/6.7.1';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath, config: customConfig }).url).toEqual(expected);
    });
});
describe('convertRegistryPathToUrl failure paths', () => {
    test('Should return an error, if an invalid url is entered', () => {
        const registryPath = 'test.com/blah';
        const runner = (0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath });
        expect(runner).toEqual({
            url: '',
            error: 'Paths must start with a $ if using a resolver or http(s) if using a url'
        });
    });
    test('Should return an error, if an unknown resolver is used', () => {
        const registryPath = '$unknown:blah';
        const runner = (0, convert_registry_path_to_url_1.convertRegistryPathToUrl)({ registryPath });
        expect(runner).toEqual({
            url: '',
            error: 'Could not find a resolver for $unknown:blah'
        });
    });
});
