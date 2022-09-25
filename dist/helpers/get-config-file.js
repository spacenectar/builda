"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const globals_1 = __importDefault(require("data/globals"));
const getConfigFile = async (configPath) => {
    if (configPath) {
        const config = require(path_1.default.resolve(configPath));
        return config;
    }
    const { configFileName } = globals_1.default;
    if (fs_1.default.existsSync(configFileName)) {
        const config = require(path_1.default.resolve(configFileName));
        return config;
    }
    return null;
};
exports.default = getConfigFile;
