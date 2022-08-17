"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getmodule = void 0;
const fs_1 = __importDefault(require("fs"));
// Import globals
const globals_1 = __importDefault(require("../data/globals"));
// Import helpers
const _helpers_1 = require("./index.js");
const config = (0, _helpers_1.getConfigFile)();
const moduleTypes = ['scaffold', 'prefab'];
const getmodule = (name) => {
    if (config) {
        const moduleList = config.modules;
        const moduleType = moduleTypes.find((type) => { var _a; return moduleList[type] && ((_a = moduleList === null || moduleList === void 0 ? void 0 : moduleList[type]) === null || _a === void 0 ? void 0 : _a[name]); });
        const path = `${globals_1.default.buildaDir}/modules/${moduleType}/${name}`;
        const registry = JSON.parse(fs_1.default.readFileSync(`${path}/registry.json`, 'utf8'));
        const files = registry.files.filter((file) => file !== 'registry.json');
        return {
            path,
            registry,
            files
        };
    }
    throw new Error(`Could not find config file`);
};
exports.getmodule = getmodule;
exports.default = exports.getmodule;
