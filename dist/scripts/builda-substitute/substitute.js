"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'node:fs';
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const helpers_1 = require("../../helpers");
/**
 * Substitute values found in all files in the rootFiles and applicationOnlyFiles arrays
 * (This is a post-processing step and exists to give prefab developers more control over the final output)
 */
exports.default = async (substitutions) => {
    var _a, _b, _c, _d;
    const config = await (0, helpers_1.getConfig)();
    if (!config.fromPrefab) {
        throw new Error('BuildaSubstitute can only be run from within an application built from a prefab');
    }
    const registry = await (0, helpers_1.getRegistry)(node_path_1.default.join(node_process_1.default.cwd(), '.builda', 'export'));
    const rootFiles = ((_b = (_a = registry === null || registry === void 0 ? void 0 : registry.generatorOptions) === null || _a === void 0 ? void 0 : _a.rootFiles) === null || _b === void 0 ? void 0 : _b.map((file) => node_path_1.default.resolve(node_process_1.default.cwd(), typeof file === 'string' ? file : file.path))) || [];
    const applicationOnlyFiles = ((_d = (_c = registry === null || registry === void 0 ? void 0 : registry.generatorOptions) === null || _c === void 0 ? void 0 : _c.applicationOnlyFiles) === null || _d === void 0 ? void 0 : _d.map((file) => node_path_1.default.resolve(node_process_1.default.cwd(), typeof file === 'string' ? file : file.path))) || [];
    const filesToRewrite = [...rootFiles, ...applicationOnlyFiles];
    (0, helpers_1.loopAndRewriteFiles)({
        paths: filesToRewrite,
        substitute: substitutions
    });
};
