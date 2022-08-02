"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const createDir = async (dirPath) => {
    try {
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
        }
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.createDir = createDir;
exports.default = exports.createDir;
