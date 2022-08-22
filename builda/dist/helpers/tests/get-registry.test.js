"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const get_registry_1 = require("../get-registry");
const fileList = ['index.stories.mdx', 'index.tsx', 'styles.module.scss'];
beforeAll(() => {
    axios_1.default.get = jest.fn().mockResolvedValue({ data: { files: fileList } });
});
afterAll(() => {
    jest.restoreAllMocks();
    jest.resetModules();
});
describe('getFileListFromRegistry() function', () => {
    test('should return a list of files from a registry.json file', async () => {
        const registryPath = 'https://builda.app/modules/foxys-own';
        const registryContent = await (0, get_registry_1.getRegistry)(registryPath);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${registryPath}/registry.json`);
        expect(registryContent.files).toEqual(fileList);
    });
});
