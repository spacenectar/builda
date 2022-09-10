"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRemoteModule = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const globals_1 = __importDefault(require("../data/globals"));
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
const get_registry_1 = __importDefault(require("./get-registry"));
const create_dir_1 = __importDefault(require("./create-dir"));
const throw_error_1 = __importDefault(require("./throw-error"));
const addRemoteModule = async (modulePath) => {
    // Ignore these files
    const ignoreFiles = ignore_file_json_1.default.ignore;
    // get the directory contents
    const registry = await (0, get_registry_1.default)(modulePath);
    const files = [...registry.files, 'registry.json'];
    files
        .filter((file) => !ignoreFiles.includes(file))
        .forEach(async (file) => {
        const srcPath = file === 'registry.json'
            ? `${modulePath}/${file}`
            : `${modulePath}/files/${file}`;
        // Download the file
        await axios_1.default
            .get(srcPath)
            .then((response) => {
            const content = file === 'registry.json'
                ? JSON.stringify(response.data, null, 2)
                : response.data.toString();
            const fileObject = {
                name: file,
                content
            };
            const outputPath = `${globals_1.default.buildaDir}/modules/${registry.type}s/${registry.name}`;
            return (0, create_dir_1.default)(outputPath).then(() => {
                return fs_1.default.writeFileSync(`${outputPath}/${fileObject.name}`, fileObject.content);
            });
        })
            .catch((error) => {
            (0, throw_error_1.default)(error);
        });
    });
    return registry;
};
exports.addRemoteModule = addRemoteModule;
exports.default = exports.addRemoteModule;
