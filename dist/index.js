#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = exports.printMessage = exports.changeCase = exports.buildaSubstitute = exports.buildaQuestion = exports.builda = void 0;
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
var builda_question_1 = require("./scripts/builda-question");
Object.defineProperty(exports, "buildaQuestion", { enumerable: true, get: function () { return builda_question_1.buildaQuestion; } });
var builda_substitute_1 = require("./scripts/builda-substitute");
Object.defineProperty(exports, "buildaSubstitute", { enumerable: true, get: function () { return builda_substitute_1.buildaSubstitute; } });
var helpers_1 = require("./helpers");
Object.defineProperty(exports, "changeCase", { enumerable: true, get: function () { return helpers_1.changeCase; } });
Object.defineProperty(exports, "printMessage", { enumerable: true, get: function () { return helpers_1.printMessage; } });
Object.defineProperty(exports, "throwError", { enumerable: true, get: function () { return helpers_1.throwError; } });
