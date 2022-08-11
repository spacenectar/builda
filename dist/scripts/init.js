"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const path_1 = __importDefault(require("path"));
const _helpers_1 = require("../helpers/index.js");
const globals_1 = __importDefault(require("../data/globals"));
const questions_1 = __importDefault(require("../data/questions"));
const { configFileName, buildaDir, docSiteUrl } = globals_1.default;
const OVERWRITE_CONFIG_QUESTION = {
    message: `Do you really want to replace your ${configFileName} file? You will lose all your current settings.`,
    name: 'replaceConfig',
    type: 'confirm'
};
const getAnswers = async () => {
    let answers = {};
    try {
        await (0, _helpers_1.askQuestion)({
            questionList: questions_1.default
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
const checkExistingConfig = async (fileName, debug) => {
    if (fs_1.default.existsSync(path_1.default.join(buildaDir, fileName))) {
        if (debug) {
            // Preset answers were passed so we are in debug/test mode
            return `You already have a ${fileName} file. Process Aborted.`;
        }
        return await (0, _helpers_1.askQuestion)(OVERWRITE_CONFIG_QUESTION).then(({ replaceConfig }) => {
            if (replaceConfig) {
                return 'yes';
            }
            return 'Process terminated due to user selection';
        });
    }
    (0, _helpers_1.printMessage)('Starting initialisation...\r', 'success');
    return 'yes';
};
const init = async ({ fileName = configFileName, presetAnswers = undefined, force = false }) => {
    var _a;
    // Check if a config file already exists unless presetAnswers is passed
    const continueProcess = !force
        ? await checkExistingConfig(fileName, presetAnswers !== undefined)
        : 'yes';
    if (continueProcess === 'yes') {
        const answers = presetAnswers || (await getAnswers());
        if (!answers.appName)
            return (0, _helpers_1.throwError)('App name is required');
        const scaffoldList = [];
        if ((_a = answers.scaffoldSelection) === null || _a === void 0 ? void 0 : _a.length) {
            scaffoldList.push(...answers.scaffoldSelection);
        }
        if (answers.customScaffoldList) {
            answers.customScaffoldList.split(',').forEach((scaffoldType) => {
                scaffoldList.push(scaffoldType.trim());
            });
        }
        const commands = Object.fromEntries(scaffoldList.map((scaffoldType) => [
            scaffoldType,
            {
                type: 'scaffold',
                outputPath: `${answers.outputDirectory}/${scaffoldType}`,
                use: '',
                substitute: {}
            }
        ]));
        const config = {
            app: {
                name: answers.appName
            },
            commands
        };
        const topText = `# Builda config file\r# This file is used to set up your 'builda' commands. Visit ${docSiteUrl}/setup for more information.`;
        fs_1.default.mkdirSync(buildaDir, { recursive: true });
        const configYaml = js_yaml_1.default.dump(config, { indent: 2 });
        const contents = `${topText}\r\n${configYaml}`;
        fs_1.default.writeFileSync(path_1.default.join(fileName), contents, 'utf8');
        // prettier.format(path.join(buildaDir, fileName));
        (0, _helpers_1.printMessage)('Created config in project root', 'success');
        return (0, _helpers_1.printMessage)(`Visit ${docSiteUrl}/setup for instructions on what to do next`, 'notice');
    }
    else {
        (0, _helpers_1.throwError)(continueProcess);
    }
};
exports.default = init;
