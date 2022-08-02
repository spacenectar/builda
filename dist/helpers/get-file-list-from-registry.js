"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileListFromRegistry = void 0;
const axios_1 = __importDefault(require("axios"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const convert_registry_path_to_url_1 = __importDefault(require("./convert-registry-path-to-url"));
const getFileListFromRegistry = async (registryPath) => {
    const registryUrl = `${(0, convert_registry_path_to_url_1.default)(registryPath)}/registry.yaml`;
    try {
        const response = await axios_1.default.get(registryUrl);
        const registryContents = js_yaml_1.default.load(response.data, {
            json: true
        });
        return registryContents.files;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.getFileListFromRegistry = getFileListFromRegistry;
exports.default = exports.getFileListFromRegistry;
