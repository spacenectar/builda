"use strict";
// Gets the name and version of the module from the path
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDetailsFromPath = void 0;
const getDetailsFromPath = (modulePath) => {
    const moduleWithoutUrl = modulePath.split('/').pop();
    if (moduleWithoutUrl) {
        const [name, version] = moduleWithoutUrl.split('@');
        return { name, version };
    }
    return { name: undefined, version: undefined };
};
exports.getDetailsFromPath = getDetailsFromPath;
exports.default = exports.getDetailsFromPath;
