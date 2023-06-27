"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const console_1 = require("../../helpers/console");
const path_1 = __importDefault(require("path"));
const getConfig = () => {
    if (fs_1.default.existsSync(path_1.default.resolve(process.cwd(), 'package.json'))) {
        const configFile = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), 'package.json'), 'utf8'));
        const config = configFile.builda;
        if (!config) {
            (0, console_1.throwError)('No "builda" entry found in package.json');
        }
        return config;
    }
    return (0, console_1.throwError)('No package.json found in project');
};
exports.default = getConfig;
