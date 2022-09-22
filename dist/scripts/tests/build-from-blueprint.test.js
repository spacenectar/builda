"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_config_file_1 = __importDefault(require("../../helpers/get-config-file"));
const build_from_blueprint_1 = __importDefault(require("../../scripts/build-from-blueprint"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_FOLDER = './experiments';
const FILE_PATH = `${FILE_FOLDER}/atoms/test-component/index.tsx`;
const CONFIG_FOLDER = '.builda';
const CONFIG_FILE = 'builda.json';
const command = {
    use: 'blueprint-default-ts',
    output_dir: './experiments/atoms',
    substitute: []
};
afterAll((done) => {
    if (fs_1.default.existsSync(CONFIG_FILE)) {
        fs_1.default.rmSync(path_1.default.resolve(CONFIG_FILE));
    }
    if (fs_1.default.existsSync(CONFIG_FOLDER)) {
        fs_1.default.rmSync(path_1.default.resolve(CONFIG_FOLDER), { recursive: true, force: true });
    }
    if (fs_1.default.existsSync(FILE_FOLDER)) {
        fs_1.default.rmSync(path_1.default.resolve(FILE_FOLDER), { recursive: true, force: true });
    }
    done();
});
describe('buildFromBlueprint', () => {
    beforeAll(async () => {
        const config = await (0, get_config_file_1.default)();
        (0, build_from_blueprint_1.default)({
            config,
            name: 'TestComponent',
            command
        });
    });
    test('Builds a component from a blueprint', () => {
        expect(fs_1.default.existsSync(FILE_PATH)).toBe(true);
    });
    test('The index.tsx file contains the correct data', () => {
        const file = fs_1.default.readFileSync(path_1.default.resolve(FILE_PATH), 'utf8');
        expect(file).toContain('export const TestComponent: React.FC<Props> = ({');
        expect(file).toContain("<div className={`'test-component' ${className}`} {...props}>");
        expect(file).toContain('export default TestComponent;');
    });
});
