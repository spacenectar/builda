"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const init_1 = __importDefault(require("../init"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
const globals_1 = __importDefault(require("../../data/globals"));
const { configFileName: fileName } = globals_1.default;
let config = {};
describe('init function (happy path)', () => {
    beforeAll(async () => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => null);
        await (0, init_1.default)({ presetAnswers: preset_answers_1.default, force: true });
        config = JSON.parse(fs_1.default.readFileSync(fileName, 'utf8'));
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    test('A config file is produced', () => {
        expect(fs_1.default.existsSync(fileName)).toBe(true);
    });
    test('The config file contains an appName value which reads "test"', () => {
        expect(config.app.name).toBe('test');
    });
    test('The config file contains an "atom" section with the correct values', () => {
        expect(config.commands.atom).toEqual({
            type: 'scaffold',
            outputPath: './experiments/atom',
            use: 'default-ts',
            substitute: []
        });
    });
    test('The config file contains an "component" section with the correct values', () => {
        expect(config.commands.component).toEqual({
            type: 'scaffold',
            outputPath: './experiments/component',
            use: 'default-ts',
            substitute: []
        });
    });
    test('The config file contains a "test" section with the correct values', () => {
        expect(config.commands.test).toEqual({
            type: 'scaffold',
            outputPath: './experiments/test',
            use: 'default-ts',
            substitute: []
        });
    });
});
describe('init function (error path)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => null);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    test('If a config file already exists, an error is thrown and the promise is rejected', () => {
        expect(() => (0, init_1.default)({ presetAnswers: preset_answers_1.default })).rejects.toThrowError(`You already have a ${fileName} file. Process Aborted.`);
    });
});
