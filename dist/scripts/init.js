"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const _helpers_1 = require("../helpers/index.js");
const { configFileName, configFileNameLegacy, docSiteUrl } = _helpers_1.globals;
const init = (force) => {
    if (fs_1.default.existsSync(configFileName) && !force) {
        (0, _helpers_1.printMessage)(`You already have a ${configFileName} file. Aborting...\n\n`, 'error');
        process.exit(1);
    }
    if (fs_1.default.existsSync(configFileNameLegacy)) {
        (0, _helpers_1.printMessage)(`${configFileNameLegacy} file detected.\n Please note: Builda and Buildcom are very different programs. It is advised you either delete the ${configFileNameLegacy} file or continue to use the legacy buildcom package.\n\n`, 'error');
        process.exit(1);
    }
    (0, _helpers_1.askQuestion)({
        questionList: _helpers_1.questions
    }).then((answers) => {
        var _a;
        const scaffoldList = [];
        if ((_a = answers.scaffoldSelection) === null || _a === void 0 ? void 0 : _a.length) {
            scaffoldList.push(...answers.scaffoldSelection);
        }
        if (answers.customScaffoldList) {
            answers.customScaffoldList.split(',').forEach((scaffoldType) => {
                scaffoldList.push(scaffoldType.trim());
            });
        }
        const scaffolds = Object.fromEntries(scaffoldList.map((scaffoldType) => [
            scaffoldType,
            { outputDirectory: '', scaffoldUrl: '' }
        ]));
        const config = {
            app: {
                name: answers.appName,
                outputDirectory: answers.outputDirectory,
                scaffoldUrl: answers.scaffoldUrl
            },
            scaffolds
        };
        const topText = `# Builda config file\r# This file is used to set up your 'builda' commands. Visit ${docSiteUrl}/setup for more information.`;
        fs_1.default.writeFileSync(configFileName, `${topText}\n\n${js_yaml_1.default.dump(config)}`, 'utf8');
        (0, _helpers_1.printMessage)('Created config in project root', 'success');
        return (0, _helpers_1.printMessage)(`Visit ${docSiteUrl}/setup for instructions on what to do next`, 'notice');
    });
};
exports.default = init;
