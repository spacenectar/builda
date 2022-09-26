"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const new_1 = __importDefault(require("../new"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const builda_json_1 = __importDefault(require("../../../mocks/builda.json"));
const registry_json_1 = __importDefault(require("../../../mocks/.builda/modules/blueprints/component/registry.json"));
const FILE_FOLDER = './experiments';
const FILE_PATH = `${FILE_FOLDER}/components/atoms/test-component/index.tsx`;
jest.mock('helpers/module/get-module', () => {
    return jest.fn().mockImplementation(() => {
        return {
            path: 'src/mocks/.builda/modules/blueprints/component',
            registry: registry_json_1.default
        };
    });
});
describe('buildFromBlueprint', () => {
    beforeAll(async () => {
        (0, new_1.default)({
            config: builda_json_1.default,
            name: 'TestComponent',
            scriptName: 'atom'
        });
    });
    afterAll(() => {
        jest.restoreAllMocks();
        jest.resetModules();
        if (fs_1.default.existsSync(FILE_FOLDER)) {
            fs_1.default.rmSync(FILE_FOLDER, { recursive: true });
        }
    });
    test('Builds a component from a blueprint', () => {
        expect(fs_1.default.existsSync(FILE_PATH)).toBe(true);
    });
    test('The index.tsx file contains the correct data', () => {
        const file = fs_1.default.readFileSync(path_1.default.resolve(FILE_PATH), 'utf8');
        expect(file).toContain('export const TestComponent: React.FC<Props> = ({');
        expect(file).toContain(' <div className={`${styles["test-component"]} ${className}`} {...props}>');
        expect(file).toContain('export default TestComponent;');
    });
});
