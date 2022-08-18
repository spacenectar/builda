"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_commands_1 = __importDefault(require("../generate-commands"));
const init_1 = __importDefault(require("../init"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
describe('generateCommands() function happy path', () => {
    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => null);
        await (0, init_1.default)({ presetAnswers: preset_answers_1.default, force: true });
    });
    afterAll(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    test('config file is parsed and commands extracted', () => {
        const commands = (0, generate_commands_1.default)();
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
});
