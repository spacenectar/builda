"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_config_file_1 = __importDefault(require("../../helpers/get-config-file"));
const generate_commands_1 = __importDefault(require("../generate-commands"));
describe('generateCommands', () => {
    let commands = {};
    beforeEach(() => {
        const config = (0, get_config_file_1.default)();
        commands = (0, generate_commands_1.default)(config);
    });
    test('config file is parsed and commands extracted', () => {
        expect(commands).toEqual({
            atom: {
                use: 'default-ts',
                output_dir: './experiments/atoms'
            },
            component: {
                use: 'default-ts',
                output_dir: './experiments/components'
            },
            test: {
                use: 'default-ts',
                output_dir: './experiments/tests'
            }
        });
    });
});
