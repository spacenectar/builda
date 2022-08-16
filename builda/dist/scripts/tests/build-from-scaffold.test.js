"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const init_1 = __importDefault(require("../init"));
const build_from_scaffold_1 = __importDefault(require("../build-from-scaffold"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
const MOCK_OUTPUT_DIRECTORY = './experiments/atom';
describe('Build from scaffold function', () => {
    beforeAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => null);
        await (0, init_1.default)({ presetAnswers: preset_answers_1.default, force: true });
        (0, build_from_scaffold_1.default)({
            name: 'TestComponent',
            command: 'atom'
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
        fs_1.default.rmSync('./experiments', { recursive: true });
    });
    test('An index.tsx file is generated with the correct data', () => {
        const filePath = `${MOCK_OUTPUT_DIRECTORY}/test-component/index.tsx`;
        expect(fs_1.default.existsSync(filePath)).toBe(true);
        const file = fs_1.default.readFileSync(filePath, 'utf8');
        expect(file).toContain('export const TestComponent: React.FC<Props> = ({');
        expect(file).toContain("<div className={`'test-component' ${className}`} {...props}>");
        expect(file).toContain('export default TestComponent;');
    });
});
