"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generate_commands_1 = __importDefault(require("scripts/builda-new/helpers/generate-commands"));
const builda_json_1 = __importDefault(require("mocks/builda.json"));
describe('generateCommands', () => {
    let commands = {};
    beforeEach(async () => {
        commands = (0, generate_commands_1.default)(builda_json_1.default);
    });
    test('config file is parsed and commands extracted', () => {
        expect(commands).toEqual({
            atom: {
                outputDir: './experiments/components/atoms',
                use: 'component'
            },
            molecule: {
                outputDir: './experiments/components/molecules',
                use: 'component'
            },
            organism: {
                outputDir: './experiments/components/organisms',
                use: 'component'
            },
            partial: {
                outputDir: './experiments/components/partials',
                use: 'component'
            },
            page: {
                outputDir: './experiments/pages',
                use: 'page'
            },
            input: {
                outputDir: './experiments/components/inputs',
                use: 'component'
            }
        });
    });
});
