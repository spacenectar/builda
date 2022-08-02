"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFromScaffold = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const js_yaml_1 = __importDefault(require("js-yaml"));
// Import ignorefile
const ignore_file_json_1 = __importDefault(require("../data/ignore-file.json"));
// import helpers
const _helpers_1 = require("../helpers/index.js");
const string_functions_1 = require("../helpers/string-functions");
// Ignore these files
const ignoreFiles = ignore_file_json_1.default.ignore;
const getRegistryData = async (isRemote, scaffoldPath) => {
    let data;
    if (isRemote) {
        data = js_yaml_1.default.load((await axios_1.default.get(`${scaffoldPath}/registry.yaml`)).data);
    }
    else {
        data = js_yaml_1.default.load(fs_1.default.readFileSync(`${scaffoldPath}/registry.yaml`, 'utf8'));
    }
    return data;
};
const buildFromLocalScaffold = (scaffoldPath, command, name, outputDirectory) => {
    // get the directory contents and
    // filter out the files we don't want
    const files = fs_1.default
        .readdirSync(scaffoldPath)
        .filter((file) => !ignoreFiles.includes(file))
        .forEach((file) => {
        (0, _helpers_1.writeFile)({ file, scaffoldPath, command, name, outputDirectory });
    });
    return files;
};
const buildFromRemoteScaffold = async (scaffoldPath, command, name, outputDirectory) => {
    // get the directory contents
    try {
        await (0, _helpers_1.getFileListFromRegistry)(scaffoldPath).then((value) => {
            const files = value;
            files
                .filter((file) => !ignoreFiles.includes(file))
                .forEach((file) => {
                // Download the file
                axios_1.default
                    .get(`${scaffoldPath}/${file}`)
                    .then((response) => {
                    const fileObject = {
                        name: file,
                        content: response.data
                    };
                    return (0, _helpers_1.writeFile)({
                        fileObject,
                        command,
                        name,
                        outputDirectory
                    });
                })
                    .catch((error) => {
                    (0, _helpers_1.throwError)(error);
                });
            });
        });
    }
    catch (error) {
        (0, _helpers_1.throwError)(error);
    }
};
const buildFromScaffold = async (command, name, scaffold) => {
    const config = (0, _helpers_1.getConfigFile)();
    (0, _helpers_1.printMessage)(`Building ${command} '${name}'...`, 'notice');
    if (config) {
        const outputDirectory = `${config.commands[command].outputDirectory}/${(0, string_functions_1.changeCase)(name, 'kebabCase')}`;
        // Create the directory tree if it doesn't exist
        fs_1.default.mkdirSync(outputDirectory, { recursive: true });
        const rawScaffoldPath = scaffold || config.commands[command].scaffoldUrl;
        const scaffoldPath = (0, _helpers_1.convertRegistryPathToUrl)(rawScaffoldPath);
        const pathType = (0, _helpers_1.detectPathType)(scaffoldPath);
        if (pathType === 'local') {
            buildFromLocalScaffold(scaffoldPath, command, name, outputDirectory);
        }
        if (pathType === 'remote') {
            buildFromRemoteScaffold(scaffoldPath, command, name, outputDirectory);
        }
        const registry = await getRegistryData(pathType === 'remote', scaffoldPath);
        console.log(scaffoldPath);
        const componentRegistry = {
            name,
            version: '1.0.0',
            author: '',
            scaffold: {
                path: rawScaffoldPath,
                version: registry.version,
                dependencies: registry.dependencies
            }
        };
        // Add a component registry file to the output directory
        return fs_1.default.writeFileSync(`${outputDirectory}/registry.yaml`, js_yaml_1.default.dump(componentRegistry));
    }
};
exports.buildFromScaffold = buildFromScaffold;
exports.default = exports.buildFromScaffold;
