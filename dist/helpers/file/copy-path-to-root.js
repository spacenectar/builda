"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyPathsToRoot = void 0;
// Copy all rootFiles into the application root
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const glob_1 = __importDefault(require("glob"));
const copyPathsToRoot = ({ paths, prefabDir, rootDir }) => {
    paths.forEach(async (file) => {
        const filePath = node_path_1.default.join(prefabDir, file);
        if (file.includes('*')) {
            const globFiles = glob_1.default
                .sync(filePath)
                .map((f) => node_path_1.default.relative(prefabDir, f));
            globFiles.forEach(async (globFile) => {
                // Get the file name
                const fileName = node_path_1.default.basename(globFile);
                // Remove the file name from the path
                const fileDir = node_path_1.default.dirname(globFile);
                // Create the directory tree
                node_fs_1.default.mkdirSync(node_path_1.default.join(rootDir, fileDir), { recursive: true });
                // Copy the file
                node_fs_1.default.copyFileSync(node_path_1.default.join(prefabDir, fileDir, fileName), node_path_1.default.join(rootDir, fileDir, fileName));
            });
        }
    });
};
exports.copyPathsToRoot = copyPathsToRoot;
exports.default = exports.copyPathsToRoot;
