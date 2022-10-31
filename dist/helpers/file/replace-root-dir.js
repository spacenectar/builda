"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (rootString, config) => {
    let rootDir = (config === null || config === void 0 ? void 0 : config.rootDir) || '.';
    if (rootDir.endsWith('/')) {
        rootDir = rootDir.slice(0, -1);
    }
    return rootString.replace(/<rootDir>/g, rootDir);
};
