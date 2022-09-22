"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
// Import helpers
const helpers_1 = require("../../helpers");
// Import data
const globals_1 = __importDefault(require("../../data/globals"));
// Import ignorefile
const string_functions_1 = __importDefault(require("../../helpers/string-functions"));
exports.default = async ({ config, modulePath }) => {
    var _a;
    let module = {};
    const outputPath = node_process_1.default.cwd();
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = node_path_1.default.join(outputPath, globals_1.default.buildaDir, 'modules');
    await (0, helpers_1.createDir)(moduleDirPath);
    const moduleType = (0, helpers_1.detectPathType)(modulePath);
    if (moduleType === 'local') {
        module = await (0, helpers_1.addLocalModule)(modulePath);
    }
    if (moduleType === 'remote') {
        module = await (0, helpers_1.addRemoteModule)((0, helpers_1.convertRegistryPathToUrl)(modulePath, config));
    }
    if (moduleType === 'custom') {
        module = await (0, helpers_1.addRemoteModule)((0, helpers_1.convertRegistryPathToUrl)(modulePath, config));
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
            if ((_a = config === null || config === void 0 ? void 0 : config.blueprints) === null || _a === void 0 ? void 0 : _a[name]) {
                (0, helpers_1.throwError)(`Blueprint already installed, perhaps you meant 'builda update ${name}?'`);
            }
            else {
                // User has never installed this blueprint before.
                config.blueprints[name] = {
                    version,
                    location: modulePath
                };
            }
        }
        if (type === 'prefab') {
            // User has installed this prefab before.
            (0, helpers_1.throwError)(`You cannot install a prefab as a module. A prefab is used to set up a new project. Try 'builda --prefab' instead.`);
        }
        // Write the config file
        node_fs_1.default.writeFile(globals_1.default.configFileName, JSON.stringify(config, null, 2), (err) => {
            if (err) {
                (0, helpers_1.throwError)(err.message);
            }
            (0, helpers_1.printMessage)(`${(0, string_functions_1.default)(type, 'pascal')}: '${name}@${version}' installed`, 'success');
        });
    }
    (0, helpers_1.throwError)('Something went wrong');
};