"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistry = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_process_1 = __importDefault(require("node:process"));
const detect_path_type_1 = __importDefault(require("./detect-path-type"));
const convert_registry_path_to_url_1 = __importDefault(require("./convert-registry-path-to-url"));
const throw_error_1 = __importDefault(require("./throw-error"));
const validate_module_path_1 = __importDefault(require("./validate-module-path"));
const getRegistry = async (registryPath) => {
    const REGISTRYFILE = 'registry.json';
    registryPath = registryPath || node_process_1.default.cwd();
    const pathType = (0, detect_path_type_1.default)(registryPath);
    if (pathType === 'local') {
        return JSON.parse(node_fs_1.default.readFileSync(`${registryPath}/${REGISTRYFILE}`, 'utf8'));
    }
    let resolved = (0, convert_registry_path_to_url_1.default)({ registryPath });
    if (resolved.error) {
        (0, throw_error_1.default)(resolved.error);
    }
    let url = resolved.url;
    if (url.includes('%FILE_NAME%')) {
        url = url.replace('%FILE_NAME%', REGISTRYFILE);
    }
    else {
        url = `${url}/${REGISTRYFILE}`;
    }
    const module = { registry: {} };
    await (0, validate_module_path_1.default)(url, module);
    return module.registry;
};
exports.getRegistry = getRegistry;
exports.default = exports.getRegistry;
