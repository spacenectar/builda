"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const _helpers_1 = require("../../helpers/index.js");
const fileName = _helpers_1.globals.configFileName;
const init = () => {
    if (fs_1.default.existsSync(fileName)) {
        (0, _helpers_1.printMessage)(`You already have a ${fileName} file. Aborting...\n\n`, 'error');
        process.exit(1);
    }
    (0, _helpers_1.askQuestion)({
        questionList: _helpers_1.questions
    }).then((answers) => {
        const typescript = answers.useTS
            ? {
                inline: answers.useTSInline === 'inline'
            }
            : false;
        const storybook = answers.createStories
            ? {
                story_format: answers.chooseStorybook
            }
            : false;
        const tests = answers.createTests
            ? {
                extension: answers.testType
            }
            : false;
        const styles = answers.createStyleSheet
            ? {
                preprocessor: answers.chooseStyleSheet,
                modules: answers.useModules
            }
            : false;
        const config = {
            output: answers.outputDirectory || './src/components',
            typescript,
            storybook,
            tests,
            styles,
            generate_readme: answers.createReadme || false,
            extra_directories: answers.createDirectories || false,
            prepopulate: answers.prepopulate || true
        };
        const configWithComments = (0, _helpers_1.configContents)(js_yaml_1.default.dump(config));
        fs_1.default.writeFileSync(fileName, configWithComments, 'utf8');
    });
};
exports.default = init;
