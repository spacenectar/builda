"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
const generate_commands_1 = __importDefault(require("../generate-commands"));
const init_1 = __importDefault(require("../init"));
const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';
let commands = [];
beforeAll(async () => {
    await (0, init_1.default)({ presetAnswers: preset_answers_1.default });
    commands = await (0, generate_commands_1.default)();
});
afterAll(() => {
    if (fs_1.default.existsSync(CONFIG_FILE)) {
        fs_1.default.rmSync(CONFIG_FILE);
    }
    if (fs_1.default.existsSync(CONFIG_FOLDER)) {
        fs_1.default.rmSync(CONFIG_FOLDER, { recursive: true });
    }
});
test('config file is parsed and commands extracted', async () => {
    expect(commands).toEqual([
        {
            name: 'atom',
            type: 'scaffold',
            use: 'default-ts',
            outputPath: './experiments/atom',
            substitute: []
        },
        {
            name: 'component',
            type: 'scaffold',
            use: 'default-ts',
            outputPath: './experiments/component',
            substitute: []
        },
        {
            name: 'test',
            type: 'scaffold',
            use: 'default-ts',
            outputPath: './experiments/test',
            substitute: []
        }
    ]);
});
