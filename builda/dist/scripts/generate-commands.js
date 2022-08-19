"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const _helpers_1 = require("../helpers/index.js");
const generateCommands = async () => {
    const config = (0, _helpers_1.getConfigFile)();
    const commands = [];
    if (config) {
        Object.keys(config.commands).forEach((command) => {
            commands.push(new Promise((resolve) => {
                const { use, outputPath, substitute } = config.commands[command];
                const { registry } = (0, _helpers_1.getModule)(config, config.commands[command]);
                resolve({
                    name: command,
                    type: registry.type,
                    use,
                    outputPath,
                    substitute
                });
            }));
        });
        return Promise.all(commands);
    }
    else {
        return Promise.reject(`Could not find config file`);
    }
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
