"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
exports.default = (message) => {
    const logFile = node_path_1.default.resolve(node_process_1.default.cwd(), 'logfile.txt');
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    if (node_fs_1.default.existsSync(logFile)) {
        node_fs_1.default.appendFileSync(logFile, logMessage);
    }
    else {
        node_fs_1.default.writeFileSync(logFile, logMessage);
    }
};
