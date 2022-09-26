"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRemoteModule = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const axios_1 = __importDefault(require("axios"));
const tar_1 = __importDefault(require("tar"));
const globals_1 = __importDefault(require("../../data/globals"));
const get_registry_1 = __importDefault(require("./get-registry"));
const helpers_1 = require("../../helpers");
const addRemoteModule = async (modulePath, output) => {
    const buildaDir = node_path_1.default.join(output || './', globals_1.default.buildaDir);
    // get the directory contents
    const registry = await (0, get_registry_1.default)(modulePath);
    console.log({ registry });
    const outputPath = registry.type === 'blueprint'
        ? `${buildaDir}/modules/blueprints/${registry.name}`
        : `${buildaDir}/modules/prefab`;
    await (0, helpers_1.createDir)(outputPath);
    (0, helpers_1.printMessage)(`Downloading ${registry.name}...`, 'downloading');
    // Download the tarball
    await axios_1.default
        .get(`${modulePath}/files.tgz`, {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/gzip'
        }
    })
        .then((res) => node_fs_1.default.writeFileSync(`${outputPath}/files.tgz`, res.data, {
        encoding: 'binary'
    }))
        .then(async () => {
        if (node_fs_1.default.existsSync(`${outputPath}/files.tgz`)) {
            (0, helpers_1.printMessage)('Extracting module files...', 'config');
            try {
                await tar_1.default.extract({
                    file: `${outputPath}/files.tgz`,
                    cwd: outputPath
                });
                node_fs_1.default.unlinkSync(`${outputPath}/files.tgz`);
            }
            catch (err) {
                (0, helpers_1.throwError)(err);
            }
        }
    })
        .catch((err) => {
        (0, helpers_1.throwError)(`There was an error downloading the tarball. Please check the URL and try again.\n\n${err}`);
    })
        .finally(() => {
        (0, helpers_1.printMessage)('Copying the registry file...', 'copying');
        // Write the registry to the output directory
        node_fs_1.default.writeFileSync(`${outputPath}/registry.json`, JSON.stringify(registry));
    });
    (0, helpers_1.printMessage)('Done.', 'success');
    return registry;
};
exports.addRemoteModule = addRemoteModule;
exports.default = exports.addRemoteModule;
