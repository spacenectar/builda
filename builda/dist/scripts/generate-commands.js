"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const generateCommands = (config) => {
    const commands = {};
    if (config) {
        Object.entries(config.scaffold_scripts).forEach((script) => {
            const name = script[0];
            const { use, output_dir, substitute } = script[1];
            commands[name] = { use, output_dir, substitute };
        });
        return commands;
    }
    else {
        throw new Error('No config file found');
    }
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
