"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const convert_registry_path_to_url_1 = __importDefault(require("./convert-registry-path-to-url"));
const detect_path_type_1 = __importDefault(require("./detect-path-type"));
const getRegistry = async (registryPath) => {
    const pathType = (0, detect_path_type_1.default)(registryPath);
    if (pathType === 'local') {
        return JSON.parse(fs_1.default.readFileSync(`${registryPath}/registry.json`, 'utf8'));
    }
    if (pathType === 'remote') {
        const registryUrl = `${(0, convert_registry_path_to_url_1.default)(registryPath)}/registry.json`;
        try {
            const response = await axios_1.default.get(registryUrl);
            return response.data;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.getRegistry = getRegistry;
exports.default = exports.getRegistry;
