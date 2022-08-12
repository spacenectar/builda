"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const init_1 = __importDefault(require("../init"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
const fileName = '.buildaTest.yml';
const options = {
    fileName,
    presetAnswers: preset_answers_1.default
};
describe('init function (happy path)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { });
        (0, init_1.default)(options);
    });
    afterEach(() => {
        jest.restoreAllMocks();
        if (fs_1.default.existsSync(fileName)) {
            fs_1.default.rmSync(fileName);
        }
    });
    test('A config file is produced', () => {
        expect(fs_1.default.existsSync(fileName)).toBe(true);
    });
    test('The config file contains an "app:" entry', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toContain('app:');
    });
    test('The config file contains an appName value which reads "test"', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toContain('name: test');
    });
    test('The config file contains an outputDirectory value which reads "./experiments"', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toContain('outputDirectory: ./experiments');
    });
    test('The config file contains a scaffoldUrl value which reads ""', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toContain('scaffoldUrl: http://test.url');
    });
    test('The config file contains a "commands:" entry', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toContain('commands:');
    });
    test('The config file contains an "atom" section with the correct values', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toMatch(/  atom:\n.   type: scaffold\n.   outputDirectory: .\/experiments\/atom\n.   scaffoldUrl: ''/gm);
    });
    test('The config file contains an "component" section with the correct values', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toMatch(/  component:\n.   type: scaffold\n.   outputDirectory: .\/experiments\/component\n.   scaffoldUrl: ''/gm);
    });
    test('The config file contains a "test" section with the correct values', () => {
        const config = fs_1.default.readFileSync(fileName, 'utf8');
        expect(config).toMatch(/  test:\n.   type: scaffold\n.   outputDirectory: .\/experiments\/test\n.   scaffoldUrl: ''/gm);
    });
});
describe('init function (error path)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    afterEach(() => {
        jest.restoreAllMocks();
        if (fs_1.default.existsSync(fileName)) {
            fs_1.default.rmSync(fileName);
        }
    });
    test('If a config file already exists, an error is thrown and the promise is rejected', () => {
        fs_1.default.writeFileSync(fileName, 'test');
        expect(() => (0, init_1.default)(options)).rejects.toThrowError(`You already have a ${fileName} file. Process Aborted.`);
    });
});
