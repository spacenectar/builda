"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const generateCommands = (config) => {
    const commands = {};
    Object.entries(config.blueprint_scripts).forEach((script) => {
        const name = script[0];
        const { use, output_dir } = script[1];
        commands[name] = { use, output_dir };
    });
    return commands;
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
