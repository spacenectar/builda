"use strict";
// Detects if a path is a local path or a remote path.
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPathType = void 0;
const detectPathType = (path) => {
    if (path.startsWith('http') || path.startsWith('https')) {
        return 'remote';
    }
    else {
        return 'local';
    }
};
exports.detectPathType = detectPathType;
exports.default = exports.detectPathType;
