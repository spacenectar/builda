"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFromScaffold = void 0;
const fs_1 = __importDefault(require("fs"));
const prettier_1 = __importDefault(require("prettier"));
// import helpers
const _helpers_1 = require("../helpers/index.js");
const string_functions_1 = require("../helpers/string-functions");
const config = (0, _helpers_1.getConfigFile)();
const buildFromScaffold = ({ name, command, substitute }) => {
    if (config) {
        (0, _helpers_1.printMessage)(`Building ${command} '${name}'...`, 'notice');
        const outputDirectory = `${config.commands[command].outputPath}/${(0, string_functions_1.changeCase)(name, 'kebabCase')}`;
        // Create the directory tree if it doesn't exist
        fs_1.default.mkdirSync(outputDirectory, { recursive: true });
        const { path: pathstring, registry, files } = (0, _helpers_1.getModule)(config.commands[command].use);
        files.forEach((file) => {
            const srcPath = `${pathstring}/${file}`;
            const outputPath = `${outputDirectory}`;
            (0, _helpers_1.writeFile)({
                file: srcPath,
                outputDirectory: outputPath,
                substitute,
                name
            });
        });
        const componentRegistry = {
            name,
            version: '1.0.0',
            author: '',
            scaffold: {
                name: registry.name,
                version: registry.version
            }
        };
        // Add a component registry file to the output directory
        return fs_1.default.writeFileSync(`${outputDirectory}/registry.json`, prettier_1.default.format(JSON.stringify(componentRegistry), { parser: 'json' }));
    }
    throw new Error('No config file found');
};
exports.buildFromScaffold = buildFromScaffold;
exports.default = exports.buildFromScaffold;
