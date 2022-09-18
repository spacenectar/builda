"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addModule = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
// Import helpers
const _helpers_1 = require("../helpers/index.js");
// Import data
const globals_1 = __importDefault(require("../data/globals"));
// Import ignorefile
const string_functions_1 = __importDefault(require("../helpers/string-functions"));
const addModule = async ({ config, path, update = false }) => {
    var _a, _b;
    let module = {};
    if (config) {
        // Check the module directory exists and create it if it doesn't
        const moduleDirPath = `${globals_1.default.buildaDir}/modules`;
        await (0, _helpers_1.createDir)(moduleDirPath);
        const moduleType = (0, _helpers_1.detectPathType)(path);
        if (moduleType === 'local') {
            module = await (0, _helpers_1.addLocalModule)(path);
        }
        if (moduleType === 'remote') {
            module = await (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(path, config));
        }
        if (moduleType === 'custom') {
            module = await (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(path, config));
        }
        if (module === null || module === void 0 ? void 0 : module.name) {
            const type = module.type;
            const name = module.name;
            const version = module.version;
            if (type === 'blueprint') {
                // User has never installed any blueprints.
                if (!(config === null || config === void 0 ? void 0 : config.blueprints)) {
                    config.blueprints = {};
                }
                // User has installed this blueprint before.
                if (((_a = config === null || config === void 0 ? void 0 : config.blueprints) === null || _a === void 0 ? void 0 : _a[name]) && !update) {
                    (0, _helpers_1.throwError)(`Blueprint already installed, perhaps you meant 'builda update ${name}?'`);
                }
                else {
                    // User has never installed this blueprint before.
                    config.blueprints[name] = {
                        version,
                        location: path
                    };
                }
            }
            if (type === 'prefab') {
                // User has never installed any prefabs.
                if (!(config === null || config === void 0 ? void 0 : config.prefabs)) {
                    config.prefabs = {};
                }
                // User has installed this prefab before.
                if (((_b = config === null || config === void 0 ? void 0 : config.prefabs) === null || _b === void 0 ? void 0 : _b[name]) && !update) {
                    (0, _helpers_1.throwError)(`Prefab already installed, perhaps you meant 'builda update ${name}?'`);
                }
                else {
                    // User has never installed this prefab before.
                    config.prefabs[name] = {
                        version,
                        location: path,
                        output_dir: '{{app_root}}'
                    };
                }
            }
            // Write the config file
            node_fs_1.default.writeFile(globals_1.default.configFileName, JSON.stringify(config, null, 2), (err) => {
                if (err) {
                    (0, _helpers_1.throwError)(err.message);
                }
                (0, _helpers_1.printMessage)(`${(0, string_functions_1.default)(type, 'pascal')}: '${name}@${version}' installed`, 'success');
            });
            return {
                module,
                config
            };
        }
        return (0, _helpers_1.throwError)('Something went wrong');
    }
    return (0, _helpers_1.throwError)('No config file found');
};
exports.addModule = addModule;
exports.default = exports.addModule;
