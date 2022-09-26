"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Import globals
const globals_1 = __importDefault(require("../../data/globals"));
// Import scripts
const scripts_1 = require("../../scripts");
const helpers_1 = require("../../helpers");
exports.default = async ({ config }) => {
    // If the project is a prefab project, install the prefab files
    const { prefab, blueprints } = config;
    const { buildaDir } = globals_1.default;
    let success = false;
    if (prefab) {
        await (0, scripts_1.buildaAdd)({
            config,
            modulePath: prefab
        });
        // Check the prefab was installed successfully
        const prefabPath = node_path_1.default.join(process.cwd(), buildaDir, 'modules', 'prefab');
        if (node_fs_1.default.existsSync(prefabPath)) {
            success = true;
        }
    }
    // If the project uses blueprints, install the blueprints that are not already
    // part of the prefab
    if (blueprints) {
        const blueprintsArray = Object.keys(blueprints).filter((blueprint) => blueprints[blueprint].location !== 'prefab');
        for (const blueprint of blueprintsArray) {
            await (0, scripts_1.buildaAdd)({
                config,
                modulePath: blueprint
            });
            // Check the blueprint was installed successfully
            const blueprintPath = node_path_1.default.join(process.cwd(), buildaDir, 'modules', 'blueprints', blueprint);
            if (node_fs_1.default.existsSync(blueprintPath)) {
                success = true;
            }
        }
    }
    if (success) {
        (0, helpers_1.printMessage)('Installation complete', 'success');
    }
};
