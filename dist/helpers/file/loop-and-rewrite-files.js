"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loopAndRewriteFiles = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const glob_1 = __importDefault(require("glob"));
const globals_1 = __importDefault(require("../../data/globals"));
const create_dir_1 = __importDefault(require("./create-dir"));
const write_file_1 = __importDefault(require("./write-file"));
const loopAndRewriteFiles = async ({ name, paths, substitute }) => {
    const { buildaDir } = globals_1.default;
    const prefabDir = node_path_1.default.join(buildaDir, 'modules', 'prefab');
    const workingDir = node_path_1.default.join(buildaDir, 'export');
    const promises = [];
    for (const file of paths) {
        const filePath = node_path_1.default.join(prefabDir, file);
        // Check if file is glob
        if (file.includes('*')) {
            const globFiles = glob_1.default
                .sync(filePath)
                .map((f) => node_path_1.default.relative(prefabDir, f));
            promises.push(await (0, exports.loopAndRewriteFiles)({ name, paths: globFiles, substitute }));
        }
        else if (node_fs_1.default.lstatSync(filePath).isDirectory()) {
            const files = node_fs_1.default.readdirSync(filePath);
            const newFiles = files.map((f) => node_path_1.default.join(file, f));
            promises.push(await (0, exports.loopAndRewriteFiles)({ name, paths: newFiles, substitute }));
        }
        else {
            promises.push(new Promise((resolve) => {
                const directoryPathWithoutFile = node_path_1.default.dirname(file);
                const directoryPath = node_path_1.default.join(workingDir, directoryPathWithoutFile);
                (0, create_dir_1.default)(directoryPath);
                if (node_fs_1.default.existsSync(filePath)) {
                    (0, write_file_1.default)({
                        file: filePath,
                        outputDir: directoryPath,
                        substitute,
                        name
                    });
                }
                resolve(filePath);
            }));
        }
    }
    // Wait for all promises to resolve
    await Promise.all(promises);
};
exports.loopAndRewriteFiles = loopAndRewriteFiles;
exports.default = exports.loopAndRewriteFiles;
