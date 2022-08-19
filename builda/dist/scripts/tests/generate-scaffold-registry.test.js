"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generate_scaffold_registry_1 = __importDefault(require("../generate-scaffold-registry"));
const scaffoldPath = path_1.default.resolve('./src/mocks/scaffolds');
const registryPath = `${scaffoldPath}/test-scaffold/registry.json`;
describe('generateScaffoldRegistry() function happy path', () => {
    (0, generate_scaffold_registry_1.default)(scaffoldPath);
    test('generateScaffoldRegistry() function generates a scaffold registry', () => {
        expect(fs_1.default.existsSync(registryPath)).toBe(true);
    });
});
