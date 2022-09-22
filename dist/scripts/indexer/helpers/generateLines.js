"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLines = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const string_functions_1 = __importDefault(require("../../helpers/string-functions"));
const generateLines = ({ directory, parent }) => {
    const dir = node_fs_1.default.readdirSync(path_1.default.resolve(directory));
    // If dir is empty, do nothing
    if (dir.length !== 0) {
        return dir
            .map((file) => {
            const pathString = parent ? `${parent}/${file}` : file;
            if (!file.match(/\.[jt]sx$/)) {
                return `export { default as ${(0, string_functions_1.default)(file, 'pascalCase')} } from './${pathString}';`;
            }
            const fileNoExt = path_1.default.parse(file).name;
            const varName = (0, string_functions_1.default)(fileNoExt, 'camelCase');
            return `export { default as ${varName} } from './${fileNoExt}';`;
        })
            .filter((item) => item)
            .toString()
            .replace(/,/g, '\n');
    }
    else {
        return '';
    }
};
exports.generateLines = generateLines;
