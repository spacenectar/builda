"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_commands_1 = __importDefault(require("../generate-commands"));
describe('generateCommands', () => {
    let commands = [];
    beforeEach(async () => {
        commands = await (0, generate_commands_1.default)();
    });
    test('config file is parsed and commands extracted', () => {
        expect(commands).toEqual([
            {
                name: 'atom',
                type: 'scaffold',
                use: 'default-ts',
                outputPath: './experiments/atoms'
            },
            {
                name: 'component',
                type: 'scaffold',
                use: 'default-ts',
                outputPath: './experiments/components'
            },
            {
                name: 'test',
                type: 'scaffold',
                use: 'default-ts',
                outputPath: './experiments/tests'
            }
        ]);
    });
});
