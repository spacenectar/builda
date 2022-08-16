"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const _helpers_1 = require("../helpers/index.js");
const generateCommands = () => {
    const config = (0, _helpers_1.getConfigFile)();
    if (config) {
        return Object.keys(config.commands).map((command) => {
            const { use, outputPath, substitute } = config.commands[command];
            const { registry } = (0, _helpers_1.getModule)(use);
            return {
                name: command,
                type: registry.type,
                use,
                outputPath,
                substitute
            };
        });
    }
    else {
        throw new Error('No config file found');
    }
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
