"use strict";
// Detects if a path is a local path or a remote path.
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPathType = void 0;
const detectPathType = (pathString) => {
    if (pathString.startsWith('/') ||
        pathString.startsWith('./') ||
        pathString.startsWith('..') ||
        pathString.startsWith('~')) {
        return 'local';
    }
    const customMatcherRegex = /[a-zA-Z0-9]:/;
    if (customMatcherRegex.test(pathString)) {
        return 'custom';
    }
    return 'remote';
};
exports.detectPathType = detectPathType;
exports.default = exports.detectPathType;
