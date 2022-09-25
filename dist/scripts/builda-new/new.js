"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
// import helpers
const helpers_1 = require("helpers");
const path_1 = __importDefault(require("path"));
const generate_commands_1 = __importDefault(require("./helpers/generate-commands"));
exports.default = ({ config, name, scriptName, subString }) => {
    const commands = (0, generate_commands_1.default)(config);
    const script = commands === null || commands === void 0 ? void 0 : commands[scriptName];
    if (!!script.use) {
        (0, helpers_1.printMessage)(`Building new ${scriptName}: '${name}'...`, 'notice');
        const outputDirectory = `${script.outputDir}/${(0, helpers_1.changeCase)(name, 'kebabCase')}`;
        // Create the directory tree if it doesn't exist
        node_fs_1.default.mkdirSync(outputDirectory, { recursive: true });
        const { path: pathstring, registry } = (0, helpers_1.getModule)('blueprint', config, script);
        const splitSubString = (subString === null || subString === void 0 ? void 0 : subString.split(':')) || [];
        const sub = splitSubString.length === 2
            ? { replace: splitSubString[0], with: splitSubString[1] }
            : undefined;
        const substitute = script
            ? (0, helpers_1.getSubstitutions)({
                registry,
                name,
                script,
                sub
            })
            : [];
        const fullPath = path_1.default.resolve(pathstring, 'files');
        node_fs_1.default.readdirSync(fullPath).forEach((file) => {
            const srcPath = `${fullPath}/${file}`;
            const outputPath = `${outputDirectory}`;
            (0, helpers_1.writeFile)({
                file: srcPath,
                outputDir: outputPath,
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
};
