"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const convert_registry_path_to_url_1 = require("../convert-registry-path-to-url");
describe('convertRegistryPathToUrl() function', () => {
    let config = {};
    beforeAll(async () => {
        config = await (0, __1.getConfigFile)();
    });
    test('should return a path to a registry.json file on the builda repository when builda: is provided', () => {
        const registryPath = 'builda:blueprint-default-js';
        const expected = 'https://builda.app/modules/blueprint-default-js';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a github repo folder path is provided', () => {
        const registryPath = 'https://github.com/test-path/builda/tree/master/blueprints/component-with-storybook';
        const expected = 'https://raw.githubusercontent.com/test-path/builda/master/blueprints/component-with-storybook';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a bitbucket repo folder path is provided', () => {
        const registryPath = 'https://bitbucket.org/builda/blueprints/src/master/component-with-storybook';
        const expected = 'https://bitbucket.org/builda/blueprints/raw/master/component-with-storybook';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a github resolver and repo is provided', () => {
        const registryPath = 'github:test-path/builda@latest';
        const expected = 'https://raw.githubusercontent.com/test-path/builda/latest';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a bitbucket resolver and repo is provided', () => {
        const registryPath = 'bitbucket:builda/blueprints/1.1.0';
        const expected = 'https://bitbucket.org/builda/blueprints/1.1.0/raw';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('Should return a path to a registry.json when a custom matcher is provided', () => {
        const customConfig = Object.assign(Object.assign({}, config), { resolve: {
                bbcustom: 'https://bitbucket.custom.url/projects/builda/repos/{%REPO_NAME%}/raw/{%FILE_NAME%}?at=refs/tags/{%VERSION%}'
            } });
        const registryPath = 'bbcustom:component-library@6.7.1';
        const expected = 'https://bitbucket.custom.url/projects/builda/repos/component-library/raw/{%FILE_NAME%}?at=refs/tags/6.7.1';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, customConfig)).toEqual(expected);
    });
    test('should return a path to a registry.json file when a non-matching http or https url is provided', () => {
        const registryPath = 'http://test.com/blah';
        const expected = 'http://test.com/blah';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
});
