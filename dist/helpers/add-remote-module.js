"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRemoteModule = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const tar_1 = __importDefault(require("tar"));
const globals_1 = __importDefault(require("../data/globals"));
const get_registry_1 = __importDefault(require("./get-registry"));
const create_dir_1 = __importDefault(require("./create-dir"));
const throw_error_1 = __importDefault(require("./throw-error"));
const print_message_1 = __importDefault(require("./print-message"));
const addRemoteModule = async (modulePath) => {
    // get the directory contents
    const registry = await (0, get_registry_1.default)(modulePath);
    const outputPath = `${globals_1.default.buildaDir}/modules/${registry.type}s/${registry.name}`;
    await (0, create_dir_1.default)(outputPath);
    (0, print_message_1.default)(`Downloading ${registry.name}...`, 'downloading');
    // Download the tarball
    await axios_1.default
        .get(`${modulePath}/files.tgz`, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/gzip'
        }
    })
        .then((res) => fs_1.default.writeFileSync(`${outputPath}/files.tgz`, res.data, {
        encoding: 'binary'
    }))
        .then(async () => {
        if (fs_1.default.existsSync(`${outputPath}/files.tgz`)) {
            (0, print_message_1.default)('Extracting module files...', 'config');
            try {
                await tar_1.default.extract({
                    file: `${outputPath}/files.tgz`,
                    cwd: outputPath
                });
                fs_1.default.unlinkSync(`${outputPath}/files.tgz`);
            }
            catch (err) {
                (0, throw_error_1.default)(err);
            }
        }
    })
        .catch((err) => {
        (0, throw_error_1.default)(`There was an error downloading the tarball. Please check the URL and try again.\n\n${err}`);
    })
        .finally(() => {
        (0, print_message_1.default)('Copying the registry file...', 'copying');
        // Write the registry to the output directory
        fs_1.default.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
    });
    (0, print_message_1.default)('Done.', 'success');
    return registry;
};
exports.addRemoteModule = addRemoteModule;
exports.default = exports.addRemoteModule;
