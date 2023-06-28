#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.builda = void 0;
const yargs_1 = __importDefault(require("yargs"));
const chalk_1 = __importDefault(require("chalk"));
// import data
const globals_1 = __importDefault(require("./data/globals"));
const builda_project_1 = require("./scripts/builda-project");
const builda_execute_1 = require("./scripts/builda-execute");
const builda_install_1 = require("./scripts/builda-install");
const builda_add_1 = require("./scripts/builda-add");
const builda_package_1 = require("./scripts/builda-package");
const builda_publish_1 = require("./scripts/builda-publish");
const builda_watch_1 = require("./scripts/builda-watch");
const builda_indexer_1 = require("./scripts/builda-indexer");
const builda_new_1 = require("./scripts/builda-new");
const builda_build_1 = require("./scripts/builda-build");
const builda_init_1 = require("./scripts/builda-init");
const { websiteUrl } = globals_1.default;
const builda = async () => {
    return yargs_1.default
        .scriptName('builda')
        .usage('$0 <cmd> [args]')
        .help()
        .demandCommand(1, 'You need at least one command before moving on. Try "builda --help" for more information')
        .command(Object.assign({}, (0, builda_project_1.command)()))
        .command(Object.assign({}, (0, builda_init_1.command)()))
        .command(Object.assign({}, (0, builda_build_1.command)()))
        .command(Object.assign({}, (0, builda_add_1.command)()))
        .command(Object.assign({}, (0, builda_install_1.command)()))
        .command(Object.assign({}, (0, builda_new_1.command)()))
        .command(Object.assign({}, (0, builda_execute_1.command)()))
        .command(Object.assign({}, (0, builda_package_1.command)()))
        .command(Object.assign({}, (0, builda_publish_1.command)()))
        .command(Object.assign({}, (0, builda_watch_1.command)()))
        .command(Object.assign({}, (0, builda_indexer_1.command)()))
        .epilogue(`For more information, visit ${chalk_1.default.blue.underline(`${websiteUrl}/docs`)}`).argv;
};
exports.builda = builda;
if (require.main === module) {
    (0, exports.builda)();
}
exports.default = exports.builda;
