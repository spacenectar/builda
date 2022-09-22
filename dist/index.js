#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builda = void 0;
// import process from 'node:process';
const yargs_1 = __importDefault(require("yargs"));
// import data
const globals_1 = __importDefault(require("./data/globals"));
const project_1 = require("./scripts/project");
const execute_1 = require("./scripts/execute");
const install_1 = require("./scripts/install");
const publish_1 = require("./scripts/publish");
const update_1 = require("./scripts/update");
const watch_1 = require("./scripts/watch");
const indexer_1 = require("./scripts/indexer");
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
const publishCommand = (0, publish_1.command)();
const updateCommand = (0, update_1.command)();
const watchCommand = (0, watch_1.command)();
const indexerCommand = (0, indexer_1.command)();
const builda = async () => {
    yargs_1.default
        .command(projectCommand)
        .command(executeCommand)
        .command(installCommand)
        .command(publishCommand)
        .command(updateCommand)
        .command(watchCommand)
        .command(indexerCommand)
        .epilogue(`For more information, visit ${websiteUrl}/docs`)
        .help('h').argv;
};
exports.builda = builda;
if (require.main === module) {
    (0, exports.builda)();
}
exports.default = exports.builda;
