"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const get_registry_1 = require("../get-registry");
const fileList = ['index.stories.mdx', 'index.tsx', 'styles.module.scss'];
describe('getFileListFromRegistry() function', () => {
    test('should return a list of files from a registry.json file', async () => {
        axios_1.default.get = jest.fn().mockResolvedValue({ data: { files: fileList } });
        const registryPath = 'https://raw.githubusercontent.com/st-elmos-fire/builda/master/scaffolds/component-with-storybook';
        const registryContent = await (0, get_registry_1.getRegistry)(registryPath);
        expect(axios_1.default.get).toHaveBeenCalledWith(`${registryPath}/registry.json`);
        expect(registryContent).toEqual(fileList);
    });
});
