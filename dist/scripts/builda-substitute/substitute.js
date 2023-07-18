"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
/**
 * Substitute values found in all files in the rootFiles and applicationOnlyFiles arrays
 * (This is a post-processing step and exists to give prefab developers more control over the final output)
 */
exports.default = async (substitutions) => {
    var _a, _b, _c;
    const registry = await (0, helpers_1.getRegistry)();
    const paths = (_c = (_b = (_a = registry === null || registry === void 0 ? void 0 : registry.generatorOptions) === null || _a === void 0 ? void 0 : _a.rootFiles) === null || _b === void 0 ? void 0 : _b.map((file) => typeof file === 'string' ? file : file.path)) !== null && _c !== void 0 ? _c : [];
    (0, helpers_1.loopAndRewriteFiles)({
        paths,
        substitute: substitutions,
        fromRoot: true,
        toRoot: true
    });
};
