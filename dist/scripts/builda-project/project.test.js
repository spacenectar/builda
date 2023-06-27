"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_1 = __importDefault(require("./project"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FILE_FOLDER = './experiments';
const cwdCache = process.cwd();
describe('builda project from prefab - no npm install', () => {
    beforeAll(async () => {
        fs_1.default.mkdirSync(FILE_FOLDER, { recursive: true });
        process.chdir(FILE_FOLDER);
        await (0, project_1.default)({
            appName: 'My App',
            prefab: 'github:builda-modules/prefab-test'
        });
    });
    afterAll(() => {
        process.chdir(cwdCache);
        jest.restoreAllMocks();
        jest.resetModules();
        if (fs_1.default.existsSync(path_1.default.resolve(FILE_FOLDER))) {
            fs_1.default.rmSync(path_1.default.resolve(FILE_FOLDER), { recursive: true });
        }
    });
    test('The .builda file contains an export dir', () => {
        const buildaDir = path_1.default.resolve('.builda');
        const pathExists = fs_1.default.existsSync(buildaDir);
        expect(pathExists).toBe(true);
    });
});
