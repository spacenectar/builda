"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getmodule = void 0;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
// Import globals
const globals_1 = __importDefault(require("../data/globals"));
const getmodule = (type, name) => {
    const path = `${globals_1.default.buildaDir}/modules/${type}/${name}`;
    const registryFile = fs_1.default.readFileSync(`${path}/registry.yaml`, 'utf8');
    const registry = js_yaml_1.default.load(registryFile, { json: true });
    const files = registry.files.filter((file) => file !== 'registry.yaml');
    return {
        path,
        registry,
        files
    };
};
exports.getmodule = getmodule;
exports.default = exports.getmodule;
