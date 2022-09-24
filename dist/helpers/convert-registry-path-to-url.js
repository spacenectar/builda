"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRegistryPathToUrl = void 0;
const resolvers_json_1 = __importDefault(require("../data/resolvers.json"));
const use_resolver_1 = __importDefault(require("./use-resolver"));
const convertRegistryPathToUrl = ({ registryPath, config }) => {
    let newPath = registryPath;
    let resolvers = resolvers_json_1.default;
    let version = '';
    let error = '';
    if (newPath.startsWith('http') || newPath.startsWith('https')) {
        // User has provided a standard url
        let url = newPath;
        if (newPath.includes('github.com')) {
            url = newPath
                .replace('github.com', 'raw.githubusercontent.com')
                .replace('/blob', '')
                .replace('/tree', '');
        }
        if (newPath.includes('bitbucket.org')) {
            url = newPath.replace('src', 'raw');
        }
        return { url, error };
    }
    if (newPath.includes('@')) {
        const pathParts = registryPath.split('@');
        newPath = pathParts[0];
        version = pathParts[1];
    }
    if (newPath.startsWith(`$`)) {
        if (config && config.resolvers) {
            resolvers = Object.assign(Object.assign({}, resolvers), config.resolvers);
        }
        const url = (0, use_resolver_1.default)({
            currentPath: newPath,
            version,
            resolvers
        });
        if (!url) {
            error = `Could not find a resolver for ${newPath}`;
        }
        return { url, error };
    }
    error =
        'Paths must start with a $ if using a resolver or http(s) if using a url';
    return { url: '', error };
};
exports.convertRegistryPathToUrl = convertRegistryPathToUrl;
exports.default = exports.convertRegistryPathToUrl;
