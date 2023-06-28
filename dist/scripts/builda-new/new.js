"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const path_1 = __importDefault(require("path"));
const generate_commands_1 = __importDefault(require("./helpers/generate-commands"));
const inquirer_1 = __importDefault(require("inquirer"));
// import helpers
const helpers_1 = require("../../helpers");
const globals_1 = __importDefault(require("../../data/globals"));
const builda_build_1 = require("../../scripts/builda-build");
const buildFromBlueprint = async (name, outputDir, config, script, subString) => {
    const { buildaDir } = globals_1.default;
    const outputDirectory = `${outputDir}/${(0, helpers_1.changeCase)(name, 'kebabCase')}`;
    const outputInExport = path_1.default.join(buildaDir, 'export', outputDirectory);
    if (node_fs_1.default.existsSync(outputDirectory)) {
        (0, helpers_1.throwError)(`A ${script.use} already exists with the name ${name}`);
    }
    if (node_fs_1.default.existsSync(outputInExport)) {
        (0, helpers_1.throwError)(`An existing ${script.use} with the name ${name} was found in the prefab. Continuing will overwrite this version.\r\nIf you want to edit the prefab version, you need to eject it with 'builda eject ${name}'`);
    }
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
        const outputDir = `${outputDirectory}`;
        (0, helpers_1.writeFile)({
            file: srcPath,
            rename: srcPath.replace('temp_name', name),
            outputDir: outputDir,
            substitute,
            name
        });
    });
    // copy the folder into the export directory
    (0, builda_build_1.buildaBuild)({
        config
    });
    return (0, helpers_1.printMessage)('Done!', 'success');
};
exports.default = async ({ config, name, scriptName, subString }) => {
    const commands = (0, generate_commands_1.default)(config);
    const script = commands === null || commands === void 0 ? void 0 : commands[scriptName];
    if (script.use) {
        if (!name || name === '') {
            (0, helpers_1.throwError)(`You need to provide a name for your new ${scriptName}`);
        }
        (0, helpers_1.printMessage)(`Building new ${scriptName}: '${name}'...`, 'notice');
        if (script.variants) {
            const answers = await inquirer_1.default.prompt([
                {
                    type: 'list',
                    name: 'variantChoice',
                    message: 'What type of component do you wish to build?',
                    choices: script.variants.map((variant) => {
                        return {
                            name: variant.name,
                            value: variant.outputDir
                        };
                    })
                }
            ]);
            await buildFromBlueprint(name, answers.variantChoice, config, script, subString);
        }
        else {
            await buildFromBlueprint(name, script.outputDir, config, script, subString);
        }
    }
    else {
        (0, helpers_1.throwError)('No valid scripts found');
    }
};
