"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const generate_blueprint_registry_1 = __importDefault(require("../../scripts/generate-blueprint-registry"));
const blueprintPath = path_1.default.resolve('./src/mocks/blueprints');
const registryPath = `${blueprintPath}/test-blueprint/registry.json`;
describe('generateBlueprintRegistry', () => {
    beforeEach((done) => {
        (0, generate_blueprint_registry_1.default)(blueprintPath);
        return done();
    });
    describe('generateBlueprintRegistry() function happy path', () => {
        test('generateBlueprintRegistry() function generates a blueprint registry', () => {
            expect(fs_1.default.existsSync(registryPath)).toBe(true);
        });
    });
});
