"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommands = void 0;
const helpers_1 = require("helpers");
const generateCommands = (config) => {
    if (config.blueprintScripts) {
        const commands = {};
        const scriptArray = Object.entries(config.blueprintScripts);
        scriptArray.forEach((script) => {
            const name = script[0];
            const { use, outputDir } = script[1];
            const updatedOutputDir = (0, helpers_1.replaceRootDir)(outputDir, config);
            commands[name] = { use, outputDir: updatedOutputDir };
        });
        return commands;
    }
    else {
        return (0, helpers_1.throwError)('No "blueprintScripts" entry found in config file');
    }
};
exports.generateCommands = generateCommands;
exports.default = exports.generateCommands;
