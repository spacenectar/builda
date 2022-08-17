"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _helpers_1 = require("../helpers/index.js");
const globals_1 = __importDefault(require("../data/globals"));
const questions_1 = __importDefault(require("../data/questions"));
const { configFileName, buildaDir, websiteUrl } = globals_1.default;
const add_module_1 = __importDefault(require("./add-module"));
const OVERWRITE_CONFIG_QUESTION = {
    message: `Do you really want to replace your ${configFileName} file? You will lose all your current settings.`,
    name: 'replaceConfig',
    type: 'confirm'
};
const getAnswers = () => {
    return new Promise(resolve => {
        (0, _helpers_1.askQuestion)({
            questionList: questions_1.default
        }).then(answers => {
            return resolve(answers);
        });
    });
};
const checkExistingConfig = (fileName, debug) => {
    return new Promise(resolve => {
        if (fs_1.default.existsSync(path_1.default.join(fileName))) {
            if (debug) {
                // Preset answers were passed so we are in debug/test mode
                return resolve(`You already have a ${fileName} file. Process Aborted.`);
            }
            return (0, _helpers_1.askQuestion)(OVERWRITE_CONFIG_QUESTION).then(({ replaceConfig }) => {
                if (replaceConfig) {
                    return resolve('yes');
                }
                return 'Process terminated due to user selection';
            });
        }
        (0, _helpers_1.printMessage)('Starting initialisation...\r', 'success');
        (0, _helpers_1.printMessage)(`All answers can be changed later by editing the ${configFileName} file`, 'notice');
        return resolve('yes');
    });
};
const init = async ({ fileName = configFileName, presetAnswers = undefined, force = false }) => {
    var _a;
    // Check if a config file already exists unless presetAnswers is passed
    const continueProcess = !force
        ? await checkExistingConfig(fileName, presetAnswers !== undefined)
        : 'yes';
    if (continueProcess === 'yes') {
        const answers = presetAnswers || await getAnswers();
        if (!answers.appName)
            return (0, _helpers_1.throwError)('App name is required');
        const scaffoldList = [];
        let module = '';
        // Install the default scaffolds
        if (answers.installDefaultModule === 'typescript') {
            (0, _helpers_1.printMessage)('Installing default scaffolds...\r', 'success');
            module = 'default-ts';
        }
        if (answers.installDefaultModule === 'javascript') {
            // Install the default scaffolds
            module = 'default-js';
        }
        if (answers.installDefaultModule === 'custom') {
            // Install the default scaffolds
            module = answers.scaffoldUrl;
        }
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
                use: module,
                substitute: []
            }
        ]));
        const config = {
            app: {
                name: answers.appName
            },
            commands
        };
        fs_1.default.mkdirSync(buildaDir, { recursive: true });
        const contents = JSON.stringify(config, null, 2);
        return new Promise(resolve => {
            fs_1.default.writeFile(path_1.default.join(fileName), contents, async (err) => {
                if (err)
                    throw err;
                (0, _helpers_1.printMessage)('Created config in project root', 'success');
                if (answers.installDefaultModule === 'custom') {
                    await (0, add_module_1.default)({ path: answers.scaffoldUrl });
                }
                if (answers.installDefaultModule === 'typescript') {
                    await (0, add_module_1.default)({
                        path: 'default-ts',
                        official: true
                    });
                }
                if (answers.installDefaultModule === 'javascript') {
                    await (0, add_module_1.default)({
                        path: 'default-js',
                        official: true
                    });
                }
                resolve();
                return (0, _helpers_1.printMessage)('Installing default scaffolds...\r', 'success');
            });
            return (0, _helpers_1.printMessage)(`Visit ${websiteUrl}/setup for instructions on what to do next`, 'notice');
        });
    }
    else {
        (0, _helpers_1.throwError)(continueProcess);
    }
};
exports.default = init;
