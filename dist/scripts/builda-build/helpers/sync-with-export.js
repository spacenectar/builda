"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncWithExport = void 0;
const globals_1 = __importDefault(require("../../../data/globals"));
const helpers_1 = require("../../../helpers");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
// Syncronises changes with the export folder
const syncWithExport = async (syncType, file, renameTo) => {
    const root = process.cwd();
    const fileName = typeof file === 'string' ? file : file.path;
    const substitute = typeof file === 'string' ? [] : file.substitutions;
    const workingDir = node_path_1.default.join(root, globals_1.default.buildaDir);
    const exportRoot = node_path_1.default.join(workingDir, 'export');
    const registry = await (0, helpers_1.getRegistry)(exportRoot);
    const cleanRoot = root.replace(/\.\//, '');
    if (syncType === 'copy') {
        // Copy the prefab files to the export directory
        return (0, helpers_1.copyPath)(`${cleanRoot}/${fileName}`, exportRoot, fileName);
    }
    if (syncType === 'update') {
        // Delete the original file in the export directory
        // and create a new copy of the file from the root
        // with any substitutions as required
        // Delete the original file
        node_fs_1.default.rmSync(node_path_1.default.join(exportRoot, fileName), {
            recursive: true,
            force: true
        });
        // Create a new copy of the file from the root
        await (0, helpers_1.loopAndRewriteFiles)({
            name: registry.name,
            paths: [node_path_1.default.join(root, fileName)],
            fromRoot: true,
            substitute
        });
    }
    if (syncType === 'rename') {
        // Rename the file in the export directory
        node_fs_1.default.renameSync(node_path_1.default.join(exportRoot, fileName), node_path_1.default.join(exportRoot, renameTo !== null && renameTo !== void 0 ? renameTo : fileName));
    }
    if (syncType === 'delete') {
        // Delete the file in the export directory
        node_fs_1.default.rmSync(node_path_1.default.join(exportRoot, fileName), {
            recursive: true,
            force: true
        });
    }
};
exports.syncWithExport = syncWithExport;
