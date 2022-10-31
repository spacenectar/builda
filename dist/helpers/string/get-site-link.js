"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __importDefault(require("../../data/globals"));
const website_paths_json_1 = __importDefault(require("../../data/website-paths.json"));
exports.default = (slug, anchor) => {
    const { websiteUrl } = globals_1.default;
    const pathParts = slug.split('/');
    const paths = website_paths_json_1.default;
    const rootPath = pathParts[0];
    const outputPaths = pathParts.map((pathPart) => {
        if (pathPart === rootPath) {
            return pathPart;
        }
        return paths[rootPath][pathPart];
    });
    return `${websiteUrl}/${outputPaths.join('/')}${anchor ? `#${anchor}` : ''}`;
};
