"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const _helpers_1 = require("../helpers/index.js");
const config = (0, _helpers_1.getConfigFile)();
const generateCommands = () => {
    if (config) {
        return Object.keys(config.commands);
    }
    else {
        throw new Error('No config file found');
    }
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
