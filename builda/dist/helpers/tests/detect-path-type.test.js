"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const detect_path_type_1 = __importDefault(require("../detect-path-type"));
describe('detectPathType', () => {
    test("should return 'local' when a local path is provided", () => {
        const path = './src/helpers/detect-path-type.ts';
        const expected = 'local';
        expect((0, detect_path_type_1.default)(path)).toEqual(expected);
    });
    test("should return 'remote' when a remote path is provided", () => {
        const path = 'https://thisurlaintreal.com';
        const expected = 'remote';
        expect((0, detect_path_type_1.default)(path)).toEqual(expected);
    });
    test("should return 'custom' when a custom path is provided", () => {
        const path = 'builda:scaffold-default-js';
        const expected = 'custom';
        expect((0, detect_path_type_1.default)(path)).toEqual(expected);
    });
});
