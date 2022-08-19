"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purgeConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const print_message_1 = __importDefault(require("./print-message"));
const CONFIG_FILE = path_1.default.resolve('.builda.json');
const CONFIG_FOLDER = path_1.default.resolve('.builda/');
const purgeConfig = async () => {
    return new Promise((resolve) => {
        if (fs_1.default.existsSync(CONFIG_FILE)) {
            fs_1.default.rmSync(CONFIG_FILE);
        }
        if (fs_1.default.existsSync(CONFIG_FOLDER)) {
            fs_1.default.rmSync(CONFIG_FOLDER, { recursive: true });
        }
        resolve((0, print_message_1.default)('Configuration purged', 'success'));
    });
};
exports.purgeConfig = purgeConfig;
exports.default = exports.purgeConfig;
