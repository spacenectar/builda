"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_commands_1 = __importDefault(require("../generate-commands"));
const debug_1 = __importDefault(require("../debug"));
describe('generateCommands() fucntion happy path', () => {
    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
        (0, debug_1.default)({ runInit: true, force: true });
    });
    afterAll(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });
    test('config file is parsed and commands extracted', () => {
        const config = (0, generate_commands_1.default)();
        expect(config).toEqual(['atom', 'component', 'test']);
    });
});
