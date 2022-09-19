"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFromBlueprint = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
// import helpers
const _helpers_1 = require("../helpers/index.js");
const string_functions_1 = require("../helpers/string-functions");
const path_1 = __importDefault(require("path"));
const buildFromBlueprint = ({ config, name, command, args }) => {
    if (config !== undefined && !!command.use) {
        (0, _helpers_1.printMessage)(`Building ${Object.keys(command)[0]} '${name}'...`, 'notice');
        const outputDirectory = `${command.output_dir}/${(0, string_functions_1.changeCase)(name, 'kebabCase')}`;
        // Create the directory tree if it doesn't exist
        node_fs_1.default.mkdirSync(outputDirectory, { recursive: true });
        const { path: pathstring, registry } = (0, _helpers_1.getModule)('blueprint', config, command);
        const substitute = command
            ? (0, _helpers_1.getSubstitutions)({
                registry,
                name,
                command,
                args
            })
            : [];
        const fullPath = path_1.default.resolve(pathstring, 'files');
        node_fs_1.default.readdirSync(fullPath).forEach((file) => {
            const srcPath = `${fullPath}/${file}`;
            const outputPath = `${outputDirectory}`;
            (0, _helpers_1.writeFile)({
                file: srcPath,
                output_dir: outputPath,
                substitute,
                name
            });
        });
        const componentRegistry = {
            name,
            version: '1.0.0',
            author: '',
            blueprint: {
                name: registry.name,
                version: registry.version
            }
        };
        // Add a component registry file to the output directory
        return node_fs_1.default.writeFileSync(`${outputDirectory}/registry.json`, JSON.stringify(componentRegistry, null, 2));
    }
    throw new Error('No config file found');
};
exports.buildFromBlueprint = buildFromBlueprint;
exports.default = exports.buildFromBlueprint;
