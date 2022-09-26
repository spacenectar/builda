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
exports.default = async ({ config, modulePath, fromScript }) => {
    var _a;
    let module = {};
    const outputPath = node_process_1.default.cwd();
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = node_path_1.default.join(outputPath, globals_1.default.buildaDir, 'modules');
    const moduleList = modulePath.includes(' ')
        ? modulePath.split(' ')
        : [modulePath];
    await (0, helpers_1.createDir)(moduleDirPath);
    for (const currentModule of moduleList) {
        if ((0, helpers_1.detectPathType)(currentModule) === 'remote') {
            const registry = (0, helpers_1.convertRegistryPathToUrl)({
                registryPath: currentModule,
                config
            }).url;
            if (!registry) {
                (0, helpers_1.throwError)('No registry found');
            }
            module = await (0, helpers_1.addRemoteModule)(registry);
        }
        else {
            module = await (0, helpers_1.addLocalModule)(currentModule);
        }
        /**
         * The following should only run if the command is being run directly from the CLI
         */
        if (!fromScript) {
            if (module === null || module === void 0 ? void 0 : module.name) {
                const type = module.type;
                const name = module.name;
                const version = module.version;
                if (type === 'blueprint') {
                    // User has never added any blueprints.
                    if (!(config === null || config === void 0 ? void 0 : config.blueprints)) {
                        config.blueprints = {};
                    }
                    // User has added this blueprint before.
                    if ((_a = config === null || config === void 0 ? void 0 : config.blueprints) === null || _a === void 0 ? void 0 : _a[name]) {
                        (0, helpers_1.throwError)(`A blueprint called ${name} already exists. Perhaps you meant 'builda update ${name}?'`);
                    }
                    else {
                        // User has never added this blueprint before.
                        config.blueprints[name] = {
                            version,
                            location: currentModule
                        };
                    }
                }
                if (type === 'prefab') {
                    // User has added this prefab before.
                    (0, helpers_1.throwError)(`You cannot add a prefab as a module. A prefab is used to set up a new project. Try 'builda project' instead.`);
                }
                // Write the config file
                node_fs_1.default.writeFile(globals_1.default.configFileName, JSON.stringify(config, null, 2), (err) => {
                    if (err) {
                        (0, helpers_1.throwError)(err.message);
                    }
                    (0, helpers_1.printMessage)(`${(0, helpers_1.changeCase)(type, 'pascal')}: '${name}@${version}' added`, 'success');
                });
            }
            else {
                (0, helpers_1.throwError)('Something went wrong');
            }
        }
    }
};
