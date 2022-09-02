"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _helpers_1 = require("../helpers/index.js");
const string_functions_1 = require("../helpers/string-functions");
const globals_1 = __importDefault(require("../data/globals"));
const questions_1 = __importDefault(require("../data/questions"));
const { configFileName, buildaDir, websiteUrl } = globals_1.default;
const add_module_1 = __importDefault(require("./add-module"));
const OVERWRITE_CONFIG_QUESTION = {
    message: `Do you really want to replace your ${configFileName} file? You will lose all your current settings.`,
    name: 'replaceConfig',
    type: 'confirm'
};
const getAnswers = async () => {
    return new Promise((resolve) => {
        (0, _helpers_1.askQuestion)({
            questionList: questions_1.default
        }).then((answers) => {
            return resolve(answers);
        });
    });
};
const checkExistingConfig = async (fileName, debug) => {
    return new Promise((resolve, reject) => {
        if (fs_1.default.existsSync(path_1.default.join(fileName))) {
            if (debug) {
                // Preset answers were passed so we are in debug/test mode
                reject(false);
                return (0, _helpers_1.throwError)(`You already have a ${fileName} file. Process Aborted.`);
            }
            return (0, _helpers_1.askQuestion)(OVERWRITE_CONFIG_QUESTION).then(({ replaceConfig }) => {
                if (replaceConfig) {
                    return resolve(true);
                }
                reject(false);
                return (0, _helpers_1.throwError)('Process terminated due to user selection');
            });
        }
        (0, _helpers_1.printMessage)('Starting initialisation...\r', 'success');
        (0, _helpers_1.printMessage)(`All answers can be changed later by editing the ${configFileName} file`, 'notice');
        return resolve(true);
    });
};
const writeConfig = async (filename, contents) => {
    return new Promise((resolve) => {
        fs_1.default.writeFile(filename, contents, (err) => {
            if (err)
                throw err;
            return resolve((0, _helpers_1.printMessage)('Created config in project root', 'success'));
        });
    });
};
const installModules = async (config, answers) => {
    (0, _helpers_1.printMessage)('Installing initial scaffold...\r', 'notice');
    let options = {
        config,
        path: answers.installDefaultModule,
        official: true
    };
    if (answers.installDefaultModule === 'custom') {
        options = {
            config,
            path: answers.scaffoldUrl,
            official: false
        };
    }
    return (0, add_module_1.default)(options);
};
const init = async ({ presetAnswers }) => {
    // Check if a config file already exists unless presetAnswers is passed
    let continueProcess = false;
    const scaffoldList = [];
    let answers = {};
    if (!presetAnswers) {
        try {
            continueProcess = await checkExistingConfig(configFileName, false);
        }
        catch (err) {
            Promise.reject(err);
            return (0, _helpers_1.throwError)(err);
        }
        try {
            answers = (await getAnswers());
        }
        catch (err) {
            Promise.reject(err);
            (0, _helpers_1.throwError)(err);
        }
    }
    else {
        continueProcess = true;
        answers = presetAnswers;
    }
    if (!answers.appName) {
        Promise.reject('No app name provided');
        return (0, _helpers_1.throwError)('App name is required');
    }
    return new Promise(async (resolve, reject) => {
        var _a;
        if (continueProcess === true) {
            fs_1.default.mkdirSync(buildaDir, { recursive: true });
            if ((_a = answers.scaffoldSelection) === null || _a === void 0 ? void 0 : _a.length) {
                scaffoldList.push(...answers.scaffoldSelection);
            }
            if (answers.customScaffoldList) {
                answers.customScaffoldList
                    .split(',')
                    .forEach((scaffoldType) => {
                    scaffoldList.push(scaffoldType.trim());
                });
            }
            const config = {
                name: answers.appName
            };
            await installModules(config, answers)
                .then((response) => {
                const scaffoldScriptsList = scaffoldList.map((scaffoldType) => [
                    scaffoldType,
                    {
                        output_dir: `${answers.outputDirectory}/${(0, string_functions_1.pluralise)(scaffoldType)}`,
                        use: response.module.name
                    }
                ]);
                const scaffoldScripts = Object.fromEntries(scaffoldScriptsList);
                const updatedConfig = Object.assign(Object.assign({}, response.config), { scaffold_scripts: scaffoldScripts });
                const configString = JSON.stringify(updatedConfig, null, 2);
                writeConfig(configFileName, configString)
                    .then(() => {
                    (0, _helpers_1.printMessage)('\rInitialisation complete', 'success');
                    (0, _helpers_1.printMessage)(`Visit ${websiteUrl}/setup for instructions on what to do next`, 'notice');
                    resolve();
                })
                    .catch((err) => {
                    reject(err);
                    (0, _helpers_1.throwError)(err);
                });
            })
                .catch((err) => {
                reject(err);
                (0, _helpers_1.throwError)(err);
            });
        }
    });
};
exports.default = init;
