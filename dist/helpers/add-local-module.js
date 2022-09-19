"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLocalModule = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const tar_1 = __importDefault(require("tar"));
const node_path_1 = __importDefault(require("node:path"));
const create_dir_1 = __importDefault(require("./create-dir"));
const get_registry_1 = __importDefault(require("./get-registry"));
const globals_1 = __importDefault(require("../data/globals"));
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
// Ignore these files
const ignoreFiles = ignore_file_json_1.default.ignore;
const getFiles = async (modulePath, outputPath, location) => {
    // Is there a tarball?
    const tarball = node_fs_1.default.existsSync(`${modulePath}/${location}.tgz`);
    // If there is a tarball, copy it to the output path and then extract it
    if (tarball) {
        node_fs_1.default.copyFileSync(`${modulePath}/${location}.tgz`, `${outputPath}/${location}.tgz`);
        await tar_1.default.extract({
            file: `${outputPath}/${location}.tgz`,
            cwd: outputPath
        });
        // Remove the tarball
        node_fs_1.default.unlinkSync(`${outputPath}/${location}.tgz`);
    }
    else {
        // get the directory contents
        const files = node_fs_1.default.readdirSync(node_path_1.default.join(modulePath, location));
        // filter out the ignore files
        const filteredFiles = files.filter((file) => !ignoreFiles.includes(file));
        // write the files to the output directory
        filteredFiles.forEach(async (file) => {
            const srcPath = `${modulePath}/${file}`;
            await (0, create_dir_1.default)(outputPath).then(() => {
                node_fs_1.default.copyFileSync(srcPath, `${outputPath}/${file}`);
            });
        });
    }
};
const addLocalModule = async (modulePath, output) => {
    const buildaDir = node_path_1.default.join(output || './', globals_1.default.buildaDir);
    // get the registry data
    const registry = await (0, get_registry_1.default)(modulePath);
    // Set the output path
    const outputPath = `${buildaDir}/modules/${registry.type}s/${registry.name}`;
    await (0, create_dir_1.default)(outputPath);
    // Get the files
    await getFiles(modulePath, outputPath, 'files');
    // Write the registry to the output directory
    node_fs_1.default.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
    return registry;
};
exports.addLocalModule = addLocalModule;
exports.default = exports.addLocalModule;
