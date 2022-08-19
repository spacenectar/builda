"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
const init_1 = __importDefault(require("../init"));
const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';
let config = {};
beforeAll(async () => {
    await (0, init_1.default)({ presetAnswers: preset_answers_1.default });
    config = JSON.parse(fs_1.default.readFileSync(CONFIG_FILE, 'utf8'));
});
afterAll(() => {
    if (fs_1.default.existsSync(CONFIG_FILE)) {
        fs_1.default.rmSync(CONFIG_FILE);
    }
    if (fs_1.default.existsSync(CONFIG_FOLDER)) {
        fs_1.default.rmSync(CONFIG_FOLDER, { recursive: true });
    }
});
test('A config file is produced', () => {
    expect(fs_1.default.existsSync(CONFIG_FILE)).toBe(true);
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
