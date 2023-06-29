"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const console_1 = require("../../helpers/console");
const path_1 = __importDefault(require("path"));
/**
 * Replaces the existing 'builda' entry in the package.json file with an updated version
 * Pass null to remove the entry
 */
const updateConfig = (update) => {
    if (fs_1.default.existsSync(path_1.default.resolve(process.cwd(), 'package.json'))) {
        const configFile = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), 'package.json'), 'utf8'));
        const config = configFile;
        const newConfig = Object.assign(Object.assign({}, config), { builda: update === null ? undefined : Object.assign({}, update) });
        fs_1.default.writeFileSync(path_1.default.resolve(process.cwd(), 'package.json'), JSON.stringify(newConfig, null, 2));
    }
    return (0, console_1.throwError)('No package.json found in project');
};
exports.updateConfig = updateConfig;
exports.default = exports.updateConfig;
