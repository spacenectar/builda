"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRegistryPathToUrl = void 0;
const urlWithProtocol = (url) => {
    // If a url starts with http or https, return the url unchanged
    if (url.startsWith('http') || url.startsWith('https')) {
        return url;
    }
    return `https://${url}`;
};
const convertRegistryPathToUrl = (registryPath, config) => {
    let newPath = registryPath;
    if (config) {
        const customMatcherKeys = config.resolve
            ? Object.keys(config.resolve)
            : undefined;
        const pathMatcher = newPath.split(':');
        if (newPath.endsWith('/')) {
            newPath = newPath.slice(0, -1);
        }
        if (pathMatcher.length > 0 && (customMatcherKeys === null || customMatcherKeys === void 0 ? void 0 : customMatcherKeys.includes(pathMatcher[0]))) {
            const slug = newPath.split(':').pop();
            for (const element of customMatcherKeys) {
                if (pathMatcher[0] === element && config.resolve) {
                    newPath = urlWithProtocol(`${config.resolve[pathMatcher[0]]}/${slug}`);
                }
            }
            return newPath;
        }
    }
    if (newPath.startsWith('github:')) {
        const updatedPath = newPath.replace('github:', 'https://raw.githubusercontent.com/');
        return `${updatedPath}/master`;
    }
    if (newPath.startsWith('builda:')) {
        const updatedPath = newPath.replace('builda:', 'https://builda.app/modules/');
        return `${updatedPath}`;
    }
    if (newPath.startsWith('bitbucket:')) {
        const updatedPath = newPath.replace('bitbucket:', 'https://bitbucket.org/');
        return `${updatedPath}/raw/master`;
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
    // If no custom matcher is provided just return the path
    return newPath;
};
exports.convertRegistryPathToUrl = convertRegistryPathToUrl;
exports.default = exports.convertRegistryPathToUrl;
