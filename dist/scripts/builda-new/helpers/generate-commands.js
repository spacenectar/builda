"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const helpers_1 = require("../../../helpers");
const generateCommands = (config) => {
    if (config.scripts) {
        const commands = {};
        const scriptArray = Object.entries(config.scripts);
        scriptArray.forEach((script) => {
            const name = script[0];
            commands[name] = script[1];
        });
        return commands;
    }
    else {
        return (0, helpers_1.throwError)('No "scripts" entry found in config file');
    }
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
