"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const globals_1 = __importDefault(require("../../data/globals"));
const console_1 = require("../../helpers/console");
exports.default = async (config) => {
    const { configFileName } = globals_1.default;
    if (!node_fs_1.default.existsSync(node_path_1.default.resolve(process.cwd(), configFileName))) {
        // Write the config file
        node_fs_1.default.writeFileSync(node_path_1.default.resolve(process.cwd(), configFileName), JSON.stringify(config, null, 2));
    }
    else {
        (0, console_1.throwError)('Config file already exists');
    }
};
