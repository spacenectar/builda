"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const _helpers_1 = require("../helpers/index.js");
const { configFileName, docSiteUrl } = _helpers_1.globals;
const getAnswers = async () => {
    let answers = {};
    try {
        await (0, _helpers_1.askQuestion)({
            questionList: _helpers_1.questions
        }).then((res) => {
            answers = res;
        });
    }
    catch (error) {
        (0, _helpers_1.printMessage)(error.message, 'error');
    }
    finally {
        return answers;
    }
};
const init = async ({ force, fileName = configFileName, presetAnswers }) => {
    var _a;
    if (fs_1.default.existsSync(fileName) && !force) {
        (0, _helpers_1.throwError)(`You already have a ${fileName} file. Process Aborted.`);
    }
    if (fs_1.default.existsSync('.buildcomrc')) {
        (0, _helpers_1.printMessage)('.buildcomrc file detected.', 'error');
        (0, _helpers_1.printMessage)('Please note:', 'notice');
        (0, _helpers_1.printMessage)('   Builda and Buildcom are very different packages.\n   It is advised you either delete the file or continue to use the legacy buildcom package.\n', 'secondary');
        (0, _helpers_1.throwError)('Please delete the .buildcomrc file and try again. Process Aborted.');
    }
    const answers = presetAnswers || (await getAnswers());
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
    fs_1.default.writeFileSync(fileName, `${topText}\n\n${js_yaml_1.default.dump(config)}`, 'utf8');
    (0, _helpers_1.printMessage)('Created config in project root', 'success');
    return (0, _helpers_1.printMessage)(`Visit ${docSiteUrl}/setup for instructions on what to do next`, 'notice');
};
exports.default = init;
