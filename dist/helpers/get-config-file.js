"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const globals_1 = __importDefault(require("./globals"));
const throw_error_1 = __importDefault(require("./throw-error"));
const { configFileName } = globals_1.default;
const configFile = path_1.default.join('.', configFileName);
const getConfigFile = () => {
    if (fs_1.default.existsSync(configFile)) {
        const config = js_yaml_1.default.load(fs_1.default.readFileSync(configFile, 'utf8'), {
            json: true
        });
        return config;
    }
    else {
        return (0, throw_error_1.default)(`${configFileName} file not found. Please run 'builda --init' to create a new config file.`);
    }
};
exports.default = getConfigFile;
