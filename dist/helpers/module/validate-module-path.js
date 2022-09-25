"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const helpers_1 = require("helpers");
const convert_registry_path_to_url_1 = __importDefault(require("./convert-registry-path-to-url"));
exports.default = async (url, returnVal) => {
    const registryUrl = (0, convert_registry_path_to_url_1.default)({
        registryPath: url
    });
    if (registryUrl.error) {
        return registryUrl.error;
    }
    const registry = registryUrl.url.includes('registry.json')
        ? registryUrl.url
        : `${registryUrl.url}/registry.json`;
    (0, helpers_1.writeLogFile)(`Fetching registry from ${registry}`);
    return axios_1.default
        .get(registry)
        .then((response) => {
        if (response.data) {
            if (returnVal) {
                returnVal.registry = response.data;
            }
            return true;
        }
        return 'The url must point to a folder that contains a registry.json file';
    })
        .catch((error) => {
        if (error.code === 'ENOTFOUND' || error.code === 'ERR_BAD_REQUEST') {
            return 'The url must point to a folder that contains a registry.json file';
        }
        if (error.code === 'ECONNREFUSED') {
            return `The server at ${registry} is not responding are you sure it is correct?`;
        }
        return error.message;
    });
};
