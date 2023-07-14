"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Copy all rootFiles into the application root
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const globals_1 = __importDefault(require("../../data/globals"));
const { buildaDir } = globals_1.default;
const prefabDir = node_path_1.default.join(buildaDir, 'modules', 'prefab');
exports.default = async (paths, rootDir, deleteOriginal) => {
    paths.forEach(async (file) => {
        const filePath = node_path_1.default.join(prefabDir, file);
        node_fs_1.default.cpSync(filePath, node_path_1.default.join(rootDir, file), { recursive: true });
        if (deleteOriginal) {
            node_fs_1.default.rmSync(filePath, { recursive: true, force: true });
        }
    });
};
