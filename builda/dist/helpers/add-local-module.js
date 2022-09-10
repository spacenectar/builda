"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLocalModule = void 0;
const fs_1 = __importDefault(require("fs"));
const tar_1 = __importDefault(require("tar"));
const create_dir_1 = __importDefault(require("./create-dir"));
const get_registry_1 = __importDefault(require("./get-registry"));
const globals_1 = __importDefault(require("../data/globals"));
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
const addLocalModule = async (modulePath) => {
    // Ignore these files
    const ignoreFiles = ignore_file_json_1.default.ignore;
    // get the registry data
    const registry = await (0, get_registry_1.default)(modulePath);
    // Set the output path
    const outputPath = `${globals_1.default.buildaDir}/modules/${registry.type}s/${registry.name}`;
    await (0, create_dir_1.default)(outputPath);
    // Is there a tarball?
    const tarball = fs_1.default.existsSync(`${modulePath}/files.tgz`);
    // If there is a tarball, copy it to the output path and then extract it
    if (tarball) {
        fs_1.default.copyFileSync(`${modulePath}/files.tgz`, `${outputPath}/files.tgz`);
        await tar_1.default.extract({
            file: `${outputPath}/files.tgz`,
            cwd: outputPath
        });
        // Remove the tarball
        fs_1.default.unlinkSync(`${outputPath}/files.tgz`);
    }
    else {
        // get the directory contents
        const files = fs_1.default.readdirSync(modulePath);
        // filter out the ignore files
        const filteredFiles = files.filter((file) => !ignoreFiles.includes(file));
        // write the files to the output directory
        filteredFiles.forEach(async (file) => {
            const srcPath = `${modulePath}/${file}`;
            await (0, create_dir_1.default)(outputPath).then(() => {
                fs_1.default.copyFileSync(srcPath, `${outputPath}/${file}`);
            });
        });
    }
    // Write the registry to the output directory
    fs_1.default.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
    return registry;
};
exports.addLocalModule = addLocalModule;
exports.default = exports.addLocalModule;
