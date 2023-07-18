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
const syncWithExport = async ({ type, pathString }) => {
    var _a, _b;
    const root = process.cwd();
    const exportRoot = node_path_1.default.resolve(root, globals_1.default.buildaDir, 'export');
    const registry = await (0, helpers_1.getRegistry)(exportRoot);
    const cleanRoot = root.replace(/\.\//, '');
    if (type === 'copy') {
        // Copy the prefab files to the export directory
        return (0, helpers_1.copyPath)(`${cleanRoot}/${pathString}`, exportRoot, pathString);
    }
    if (type === 'update') {
        // Delete the original file in the export directory
        // and create a new copy of the file from the root
        // Check the registry to see if the file has any substitutions
        const fileWithSubstitutions = (_b = (_a = registry.generatorOptions) === null || _a === void 0 ? void 0 : _a.rootFiles) === null || _b === void 0 ? void 0 : _b.find((rootFile) => {
            if (typeof rootFile === 'string') {
                // We don't need to worry about path only root files
                return false;
            }
            else if (!rootFile.substitutions ||
                rootFile.substitutions.length === 0) {
                // We don't need to worry about root files without substitutions
                return false;
            }
            else {
                return rootFile.path === pathString;
            }
        });
        // Delete the original file
        node_fs_1.default.rmSync(node_path_1.default.join(exportRoot, pathString), {
            recursive: true,
            force: true
        });
        if (fileWithSubstitutions) {
            // If the file is a root file, we need to loop through the substitutions
            await (0, helpers_1.loopAndRewriteFiles)({
                name: registry.name,
                paths: [node_path_1.default.join(root, pathString)],
                fromRoot: true,
                substitute: fileWithSubstitutions.substitutions
            });
        }
        else {
            // The file has no substitutions, so we can just copy it from the root
            return (0, helpers_1.copyPath)(`${cleanRoot}/${pathString}`, exportRoot, pathString);
        }
    }
    if (type === 'delete') {
        // Delete the file in the export directory
        node_fs_1.default.rmSync(node_path_1.default.join(exportRoot, pathString), {
            recursive: true,
            force: true
        });
    }
};
exports.syncWithExport = syncWithExport;
exports.default = exports.syncWithExport;
