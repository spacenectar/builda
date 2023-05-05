"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDir = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const copyDir = (source, destination) => {
    if (!node_fs_1.default.existsSync(destination)) {
        node_fs_1.default.mkdirSync(destination);
    }
    node_fs_1.default.readdirSync(source).forEach((file) => {
        const srcPath = node_path_1.default.resolve(source, file);
        const destPath = node_path_1.default.resolve(destination, file);
        if (node_fs_1.default.lstatSync(srcPath).isDirectory()) {
            (0, exports.copyDir)(srcPath, destPath);
        }
        else {
            node_fs_1.default.cpSync(srcPath, destPath, {
                dereference: true
            });
        }
    });
};
exports.copyDir = copyDir;
exports.default = exports.copyDir;
