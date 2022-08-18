"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRegistryPathToUrl = void 0;
const convertRegistryPathToUrl = (registryPath, customMatcher) => {
    let newPath = registryPath;
    if (!newPath.startsWith('http') || !newPath.startsWith('https')) {
        newPath = `https://builda.app/modules/${newPath}`;
    }
    if (newPath.endsWith('/')) {
        newPath = newPath.slice(0, -1);
    }
    if (customMatcher) {
        const regex = new RegExp(customMatcher.original, 'gm');
        return newPath.replace(regex, customMatcher.transformed);
    }
    if (newPath.includes('github.com')) {
        return newPath
            .replace('github.com', 'raw.githubusercontent.com')
            .replace('/blob', '')
            .replace('/tree', '');
    }
    if (newPath.includes('bitbucket.org')) {
        return newPath.replace('src', 'raw');
    }
    return newPath;
};
exports.convertRegistryPathToUrl = convertRegistryPathToUrl;
exports.default = exports.convertRegistryPathToUrl;
