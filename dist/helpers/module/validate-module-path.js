"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ajv_1 = __importDefault(require("ajv"));
const convert_registry_path_to_url_1 = __importDefault(require("./convert-registry-path-to-url"));
const module_registry_schema_json_1 = __importDefault(require("../../data/module-registry-schema.json"));
const ajv = new ajv_1.default();
exports.default = async (url, resolved) => {
    let registryUrl = url;
    if (!resolved) {
        const rurl = (0, convert_registry_path_to_url_1.default)({
            registryPath: url
        });
        if (rurl.error) {
            return {
                status: false,
                message: rurl.error
            };
        }
        registryUrl = rurl.url;
    }
    const registry = registryUrl.includes('registry.json')
        ? registryUrl
        : `${registryUrl}/registry.json`;
    return axios_1.default
        .get(registry)
        .then((response) => {
        var _a;
        if (!response.data) {
            return {
                status: false,
                message: 'Something went wrong while fetching the registry. No data was returned and no error was provided.'
            };
        }
        // Validate the json file
        const validate = ajv.compile(module_registry_schema_json_1.default);
        const valid = validate(response.data);
        if (valid) {
            return {
                status: true,
                message: 'Registry fetched successfully'
            };
        }
        (_a = validate.errors) === null || _a === void 0 ? void 0 : _a.forEach((error) => {
            console.log(`Registry validation error: ${error.message}`);
        });
        return {
            status: false,
            message: 'The registry file is not valid. Please check the documentation for the correct format.'
        };
    })
        .catch((error) => {
        if (error.code === 'ENOTFOUND' || error.code === 'ERR_BAD_REQUEST') {
            return {
                status: false,
                message: 'The url must point to a folder that contains a registry.json file'
            };
        }
        if (error.code === 'ECONNREFUSED') {
            return {
                status: false,
                message: `The server at ${registry} is not responding are you sure it is correct?`
            };
        }
        return {
            status: false,
            message: error.message
        };
    });
};
