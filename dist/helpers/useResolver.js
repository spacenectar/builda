"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResolver = void 0;
const url_with_protocol_1 = require("./url-with-protocol");
const useResolver = ({ currentPath, name, version, resolvedPath }) => {
    let resolvedUrl = currentPath;
    if (resolvedUrl.includes('$REPO_NAME')) {
        resolvedUrl = resolvedUrl.replace('$REPO_NAME', resolvedPath);
    }
    else {
        resolvedUrl = resolvedUrl.replace(name, resolvedPath);
    }
    if (resolvedUrl.includes('$VERSION')) {
        resolvedUrl = resolvedUrl.replace('$VERSION', version);
    }
    else {
        resolvedUrl = `${resolvedUrl}/${version}`;
    }
    return (0, url_with_protocol_1.urlWithProtocol)(resolvedUrl);
};
exports.useResolver = useResolver;
