"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const globals_1 = __importDefault(require("../../data/globals"));
const getConfigFile = async (configPath) => {
    if (configPath) {
        const config = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(configPath), 'utf8'));
        return config;
    }
    const { configFileName } = globals_1.default;
    if (fs_1.default.existsSync(configFileName)) {
        const config = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(configFileName), 'utf8'));
        return config;
    }
    return null;
};
exports.default = getConfigFile;
