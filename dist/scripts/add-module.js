#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModule = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
// Import helpers
const _helpers_1 = require("../helpers/index.js");
// Import data
const globals_1 = __importDefault(require("../data/globals"));
// Import ignorefile
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
const string_functions_1 = __importDefault(require("../helpers/string-functions"));
// Ignore these files
const ignoreFiles = ignore_file_json_1.default.ignore;
const addLocalModule = async (modulePath) => {
    // get the registry data
    const registry = await (0, _helpers_1.getRegistry)(modulePath);
    // get the directory contents
    const files = fs_1.default.readdirSync(modulePath);
    // filter out the ignore files
    const filteredFiles = files.filter((file) => !ignoreFiles.includes(file));
    // write the files to the output directory
    filteredFiles.forEach((file) => {
        const srcPath = `${modulePath}/${file}`;
        const outputPath = `${globals_1.default.buildaDir}/modules/${registry.type}/${registry.name}`;
        (0, _helpers_1.createDir)(outputPath).then(() => {
            fs_1.default.copyFileSync(srcPath, `${outputPath}/${file}`);
        });
    });
    return registry;
};
const addRemoteModule = async (modulePath) => {
    // get the directory contents
    const registry = await (0, _helpers_1.getRegistry)(modulePath);
    const files = [...registry.files, 'registry.yaml'];
    files
        .filter((file) => !ignoreFiles.includes(file))
        .forEach((file) => {
        // Download the file
        axios_1.default
            .get(`${modulePath}/${file}`)
            .then((response) => {
            const fileObject = {
                name: file,
                content: response.data
            };
            const outputPath = `${globals_1.default.buildaDir}/modules/${registry.type}/${registry.name}`;
            (0, _helpers_1.createDir)(outputPath).then(() => {
                return fs_1.default.writeFileSync(`${outputPath}/${fileObject.name}`, fileObject.content);
            });
        })
            .catch((error) => {
            (0, _helpers_1.throwError)(error);
        });
    });
    return registry;
};
const addModule = async (path) => {
    const config = (0, _helpers_1.getConfigFile)();
    if (config) {
        // Check the module directory exists and create it if it doesn't
        const moduleDirPath = `${globals_1.default.buildaDir}/modules`;
        await (0, _helpers_1.createDir)(moduleDirPath).then(async () => {
            var _a, _b;
            const moduleType = (0, _helpers_1.detectPathType)(path);
            let module;
            if (moduleType === 'local') {
                module = await addLocalModule(path);
            }
            if (moduleType === 'remote') {
                module = await addRemoteModule((0, _helpers_1.convertRegistryPathToUrl)(path));
            }
            if (module === null || module === void 0 ? void 0 : module.name) {
                const type = module.type;
                const name = module.name;
                const version = module.version;
                // User has never installed any modules.
                if (!config.modules) {
                    config.modules = {};
                }
                if (type === 'scaffold') {
                    // User has never installed any scaffolds.
                    if (!((_a = config === null || config === void 0 ? void 0 : config.modules) === null || _a === void 0 ? void 0 : _a.scaffold)) {
                        config.modules.scaffold = {};
                    }
                    const scaffolds = config.modules.scaffold;
                    scaffolds[name] = version;
                }
                if (type === 'prefab') {
                    // User has never installed any prefabs.
                    if (!((_b = config === null || config === void 0 ? void 0 : config.modules) === null || _b === void 0 ? void 0 : _b.prefab)) {
                        config.modules.prefab = {};
                    }
                    const prefabs = config.modules.prefab;
                    prefabs[name] = version;
                }
                // Write the config file
                fs_1.default.writeFileSync(globals_1.default.configFileName, js_yaml_1.default.dump(config, { indent: 2 }));
                return (0, _helpers_1.printMessage)(`${(0, string_functions_1.default)(type, 'pascal')}: ${name}@${version} installed`, 'success');
            }
        });
    }
};
exports.addModule = addModule;
exports.default = exports.addModule;
