"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const detect_path_type_1 = __importDefault(require("./detect-path-type"));
const throw_error_1 = __importDefault(require("./throw-error"));
const getRegistry = async (registryPath) => {
    const pathType = (0, detect_path_type_1.default)(registryPath);
    if (pathType === 'local') {
        return JSON.parse(fs_1.default.readFileSync(`${registryPath}/registry.json`, 'utf8'));
    }
    return axios_1.default
        .get(`${registryPath}/registry.json`)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        if (error.status === 404) {
            (0, throw_error_1.default)(`\nNo module found at ${registryPath} \n If you want to use a custom registry, please use the full url (including http(s)://)\n or add a custom resolver (see https://builda.app/docs/custom-resolver)`);
        }
        (0, throw_error_1.default)(error);
    });
};
exports.getRegistry = getRegistry;
exports.default = exports.getRegistry;
