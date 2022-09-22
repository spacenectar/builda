#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builda = void 0;
const yargs_1 = __importDefault(require("yargs"));
// import data
const globals_1 = __importDefault(require("./data/globals"));
// import scripts
// import addModule from './scripts/add-module';
// import buildFromBlueprint from './scripts/build-from-blueprint';
// import buildFromPrefabs from './scripts/build-from-prefabs';
// import generateCommands from './scripts/generate-commands';
// import generateIndexes from './scripts/generate-indexes';
// import init from './scripts/init';
// import publishModule from './scripts/publish-module';
// import updateModule from './scripts/update-module';
// import watch from './scripts/watch';
const project_1 = require("./scripts/project");
const execute_1 = require("./scripts/execute");
const install_1 = require("./scripts/install");
const { websiteUrl } = globals_1.default;
// const cwd = process.cwd();
// const isExportDir = cwd.includes(`${globals.buildaDir}/export`);
// const CREATE_CONFIG_QUESTION = {
//   message: `Would you like to create a ${configFileName} config?`,
//   name: 'createConfig',
//   type: 'confirm' as QuestionType
// };
const projectCommand = (0, project_1.command)();
const executeCommand = (0, execute_1.command)();
const installCommand = (0, install_1.command)();
const builda = async () => {
    yargs_1.default
        .command(projectCommand)
        .command(executeCommand)
        .command(installCommand)
        .epilogue(`For more information, visit ${websiteUrl}/docs`)
        .help('h').argv;
};
exports.builda = builda;
if (require.main === module) {
    (0, exports.builda)();
}
exports.default = exports.builda;
