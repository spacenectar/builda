"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const update_1 = __importDefault(require("./update"));
exports.default = () => {
    return {
        cmd: 'update <modulePath>',
        desc: 'update a module',
        aliases: ['u'],
        handler: async (argv) => {
            const config = await (0, helpers_1.getConfigFile)(argv.configPath);
            if (config) {
                return (0, update_1.default)(argv.version);
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
