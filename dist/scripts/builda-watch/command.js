"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const watch_1 = __importDefault(require("./watch"));
exports.default = () => {
    return {
        command: 'watch',
        desc: 'Watches your app for changes and rebuilds',
        aliases: ['w'],
        builder: (yargs) => {
            return yargs.option('configPath', {
                aliases: ['c', 'config'],
                default: '',
                describe: 'The path to a config file',
                type: 'string'
            });
        },
        handler: async () => {
            const config = await (0, helpers_1.getConfig)();
            if (config === null || config === void 0 ? void 0 : config.prefab) {
                return (0, watch_1.default)(config);
            }
            else if ((config === null || config === void 0 ? void 0 : config.prefab) === undefined) {
                (0, helpers_1.throwError)('No prefab found in config file. Watch can only be run within a prefab');
            }
            (0, helpers_1.throwError)('No config file found');
        }
    };
};
