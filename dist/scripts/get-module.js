"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getmodule = void 0;
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const getmodule = (modulePath) => {
    const registryFile = fs_1.default.readFileSync(`${modulePath}/registry.yaml`, 'utf8');
    const registry = js_yaml_1.default.load(registryFile, { json: true });
    const files = registry.files;
    return {
        registry,
        files: files.filter((file) => file !== 'registry.yaml')
    };
};
exports.getmodule = getmodule;
exports.default = exports.getmodule;
