"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_config_file_1 = __importDefault(require("../../helpers/get-config-file"));
const generate_commands_1 = __importDefault(require("../generate-commands"));
describe('generateCommands', () => {
    let commands = {};
    beforeEach(async () => {
        const config = await (0, get_config_file_1.default)();
        commands = (0, generate_commands_1.default)(config);
    });
    test('config file is parsed and commands extracted', () => {
        expect(commands).toEqual({
            atom: {
                use: 'blueprint-default-ts',
                output_dir: '{{app_root}}/atoms'
            },
            component: {
                use: 'blueprint-default-ts',
                output_dir: '{{app_root}}/components'
            },
            test: {
                use: 'blueprint-default-ts',
                output_dir: '{{app_root}}/tests'
            }
        });
    });
});
