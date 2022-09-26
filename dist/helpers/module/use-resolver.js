"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResolver = void 0;
const helpers_1 = require("../../helpers");
const useResolver = ({ currentPath, version, resolvers }) => {
    const name = currentPath.split(':')[0].replace('$', '').toLowerCase();
    const resolved = resolvers[name];
    if (!resolved) {
        return '';
    }
    let resolvedUrl = resolved;
    const repoName = currentPath.split(':')[1];
    if (resolvedUrl.includes('%REPO_NAME%')) {
        resolvedUrl = resolvedUrl.replace('%REPO_NAME%', repoName);
    }
    else {
        resolvedUrl = resolvedUrl.replace(`${name}`, '');
    }
    if (resolvedUrl.includes('%VERSION%')) {
        resolvedUrl = resolvedUrl.replace('%VERSION%', version);
    }
    else {
        resolvedUrl = `${resolvedUrl}/${version || 'latest'}`;
    }
    if (resolvedUrl.endsWith('/')) {
        resolvedUrl = resolvedUrl.slice(0, -1);
    }
    return (0, helpers_1.urlWithProtocol)(resolvedUrl);
};
exports.useResolver = useResolver;
exports.default = exports.useResolver;
