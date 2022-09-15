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
        const registryPath = 'builda:scaffold-default-js';
        const expected = 'https://builda.app/modules/scaffold-default-js';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a github repo folder path is provided', () => {
        const registryPath = 'https://github.com/test-path/builda/tree/master/scaffolds/component-with-storybook';
        const expected = 'https://raw.githubusercontent.com/test-path/builda/master/scaffolds/component-with-storybook';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a bitbucket repo folder path is provided', () => {
        const registryPath = 'https://bitbucket.org/builda/scaffolds/src/master/component-with-storybook/';
        const expected = 'https://bitbucket.org/builda/scaffolds/raw/master/component-with-storybook';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a github resolver and repo is provided', () => {
        const registryPath = 'github:test-path/builda';
        const expected = 'https://raw.githubusercontent.com/test-path/builda/master';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('should return a raw path to a registry.json file when a bitbucket resolver and repo is provided', () => {
        const registryPath = 'bitbucket:builda/scaffolds';
        const expected = 'https://bitbucket.org/builda/scaffolds/raw/master';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
    test('Should return a path to a registry.json when a custom matcher is provided', () => {
        const customConfig = {
            resolve: {
                bbcustom: 'https://bitbucket.custom.url/projects/builda/repos/component-library/raw/master'
            }
        };
        const registryPath = 'bbcustom:components';
        const expected = 'https://bitbucket.custom.url/projects/builda/repos/component-library/raw/master/components';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, customConfig)).toEqual(expected);
    });
    test('should return a path to a registry.json file when a non-matching http or https url is provided', () => {
        const registryPath = 'http://test.com/blah';
        const expected = 'http://test.com/blah';
        expect((0, convert_registry_path_to_url_1.convertRegistryPathToUrl)(registryPath, config)).toEqual(expected);
    });
});
