"use strict";
// Detects if a path is a local path or a remote path.
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPathType = void 0;
const detectPathType = (path) => {
    if (path.startsWith('/') ||
        path.startsWith('./') ||
        path.startsWith('..') ||
        path.startsWith('~')) {
        return 'local';
    }
    else {
        return 'remote';
    }
};
exports.detectPathType = detectPathType;
exports.default = exports.detectPathType;
