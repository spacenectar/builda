"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRegistryPathToUrl = void 0;
const resolvers_json_1 = __importDefault(require("../../data/resolvers.json"));
const use_resolver_1 = __importDefault(require("./use-resolver"));
const convertRegistryPathToUrl = ({ registryPath, config }) => {
    const newPath = registryPath;
    let error = '';
    let resolvers = resolvers_json_1.default;
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
        if (url.endsWith('/')) {
            url = url.slice(0, -1);
        }
        return { url, error };
    }
    const resolverMatcher = newPath.match(/^([a-z]+:{1}[/]{0})([a-z0-9-/]+)((?:@{1}v?[0-9.]+)?(?:[\w\d-]*))?$/);
    if (resolverMatcher) {
        const resolver = resolverMatcher[1].replace(':', '');
        const modulePath = resolverMatcher[2];
        const version = resolverMatcher[3]
            ? resolverMatcher[3].replace('@', '')
            : 'latest';
        if (config && config.resolvers) {
            resolvers = Object.assign(Object.assign({}, resolvers), config.resolvers);
        }
        const url = (0, use_resolver_1.default)({
            resolver,
            modulePath,
            version,
            resolvers
        });
        if (!url) {
            error = `Could not find a resolver for ${newPath}`;
        }
        return { url, error };
    }
    error =
        'Paths must start with a colon terminated lowercase string with no spaces or special characters (e.g. "builda:" or "([a-z]+:{1}[/]{0})" ) if using a resolver or "http(s)" if using a url';
    return { url: '', error };
};
exports.convertRegistryPathToUrl = convertRegistryPathToUrl;
exports.default = exports.convertRegistryPathToUrl;
