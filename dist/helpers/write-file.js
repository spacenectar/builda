"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const string_functions_1 = __importDefault(require("./string-functions"));
const writeFile = ({ file, fileObject, outputDirectory, command, name, scaffoldPath }) => {
    const fileName = file || (fileObject === null || fileObject === void 0 ? void 0 : fileObject.name);
    if (file && fileObject)
        throw new Error('Cannot provide file and fileObject at the same time.');
    // get the file contents
    const fileContents = file && scaffoldPath
        ? fs_1.default.readFileSync(path_1.default.resolve(`${scaffoldPath}/${file}`), 'utf8')
        : fileObject === null || fileObject === void 0 ? void 0 : fileObject.content;
    // replace the each placeholder with the correctly formatted name
    const newContents = fileContents &&
        fileContents
            .replace(/%TYPE%/g, command)
            .replace(/%KEBAB_CASE%/g, (0, string_functions_1.default)(name, 'kebabCase'))
            .replace(/%CAMEL_CASE%/g, (0, string_functions_1.default)(name, 'camelCase'))
            .replace(/%SNAKE_CASE%/g, (0, string_functions_1.default)(name, 'snakeCase'))
            .replace(/%PASCAL_CASE%/g, (0, string_functions_1.default)(name, 'pascalCase'))
            .replace(/%SENTENCE_CASE%/g, (0, string_functions_1.default)(name, 'sentenceCase'));
    // write the new file contents to the output directory
    if (newContents) {
        return fs_1.default.writeFileSync(`${outputDirectory}/${fileName}`, newContents);
    }
    throw new Error(`Could not write file ${fileName}`);
};
exports.writeFile = writeFile;
exports.default = exports.writeFile;