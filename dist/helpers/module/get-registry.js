"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_process_1 = __importDefault(require("node:process"));
const helpers_1 = require("../../helpers");
const axios_1 = __importDefault(require("axios"));
const getRegistry = async (registryPath) => {
    const REGISTRYFILE = 'registry.json';
    registryPath = registryPath || node_process_1.default.cwd();
    const pathType = (0, helpers_1.detectPathType)(registryPath);
    if (pathType === 'local') {
        return JSON.parse(node_fs_1.default.readFileSync(`${registryPath}/${REGISTRYFILE}`, 'utf8'));
    }
    const resolved = (0, helpers_1.convertRegistryPathToUrl)({ registryPath });
    if (resolved.error) {
        (0, helpers_1.throwError)(resolved.error);
    }
    let url = resolved.url;
    if (url.includes('%FILE_NAME%')) {
        url = url.replace('%FILE_NAME%', REGISTRYFILE);
    }
    else {
        url = `${url}/${REGISTRYFILE}`;
    }
    const validModule = await (0, helpers_1.validateModulePath)(url, true);
    if (!validModule.status) {
        (0, helpers_1.throwError)(validModule.message);
    }
    return axios_1.default
        .get(url, {
        responseType: 'json'
    })
        .then((response) => {
        return response.data;
    })
        .catch((error) => {
        (0, helpers_1.throwError)(error.message);
    });
};
exports.getRegistry = getRegistry;
exports.default = exports.getRegistry;
