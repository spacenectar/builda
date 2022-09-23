"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_process_1 = __importDefault(require("node:process"));
const detect_path_type_1 = __importDefault(require("./detect-path-type"));
const convert_registry_path_to_url_1 = __importDefault(require("./convert-registry-path-to-url"));
const throw_error_1 = __importDefault(require("./throw-error"));
const getRegistry = async (registryPath) => {
    const REGISTRYFILE = 'registry.json';
    registryPath = registryPath || node_process_1.default.cwd();
    const pathType = (0, detect_path_type_1.default)(registryPath);
    if (pathType === 'local') {
        return JSON.parse(node_fs_1.default.readFileSync(`${registryPath}/${REGISTRYFILE}`, 'utf8'));
    }
    let url = (0, convert_registry_path_to_url_1.default)({ registryPath });
    if (url.match(/{%FILE_NAME%}/)) {
        url = url.replace(/{%FILE_NAME%}/, REGISTRYFILE);
    }
    else {
        url = `${url}/${REGISTRYFILE}`;
    }
    return axios_1.default
        .get(url)
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        if (error.status === 404) {
            (0, throw_error_1.default)(`\nNo module found at ${registryPath} \n If you want to use a custom registry, please use the full url (including http(s)://)\n or add a custom resolver (see https://builda.app/docs/resolvers)`);
        }
        (0, throw_error_1.default)(error);
    });
};
exports.getRegistry = getRegistry;
exports.default = exports.getRegistry;
