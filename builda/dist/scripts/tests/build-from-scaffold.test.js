"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_from_scaffold_1 = __importDefault(require("../build-from-scaffold"));
const fs_1 = __importDefault(require("fs"));
const init_1 = __importDefault(require("../init"));
const preset_answers_1 = __importDefault(require("../../mocks/preset-answers"));
const FILE_PATH = `./experiments/atom/test-component/index.tsx`;
const CONFIG_FILE = '.builda.json';
const CONFIG_FOLDER = '.builda';
beforeAll(async () => {
    await (0, init_1.default)({ presetAnswers: preset_answers_1.default });
    return (0, build_from_scaffold_1.default)({
        name: 'TestComponent',
        command: 'atom'
    });
});
afterAll(() => {
    if (fs_1.default.existsSync(CONFIG_FILE)) {
        fs_1.default.rmSync(CONFIG_FILE);
    }
    if (fs_1.default.existsSync(CONFIG_FOLDER)) {
        fs_1.default.rmSync(CONFIG_FOLDER, { recursive: true });
    }
    if (fs_1.default.existsSync(FILE_PATH)) {
        fs_1.default.rmSync(FILE_PATH);
    }
});
test('Builds a component from a scaffold', () => {
    expect(fs_1.default.existsSync(FILE_PATH)).toBe(true);
});
test('The index.tsx file contains the correct data', () => {
    const file = fs_1.default.readFileSync(FILE_PATH, 'utf8');
    expect(file).toContain('export const TestComponent: React.FC<Props> = ({');
    expect(file).toContain("<div className={`'test-component' ${className}`} {...props}>");
    expect(file).toContain('export default TestComponent;');
});
