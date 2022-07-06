"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _helpers_1 = require("../../helpers/index.js");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const fileName = _helpers_1.globals.configFileName;
const migrate = () => {
    const { configFileName, configFileNameLegacy } = _helpers_1.globals;
    if (fs_1.default.existsSync(fileName)) {
        (0, _helpers_1.printMessage)(`You already have a ${fileName} file. Aborting...\n\n`, 'error');
        process.exit(1);
    }
    if (!fs_1.default.existsSync(configFileNameLegacy)) {
        (0, _helpers_1.printMessage)(`No ${configFileNameLegacy} file found. Try --init instead. Aborting...`, 'error');
        process.exit(1);
    }
    const legacyConfigRead = fs_1.default.readFileSync(configFileNameLegacy, 'utf8');
    const legacyConfig = js_yaml_1.default.load(legacyConfigRead);
    const config = {
        output: legacyConfig.output || './src/components',
        typescript: legacyConfig.typescript
            ? {
                inline: legacyConfig.typescript.inline || false
            }
            : false,
        storybook: legacyConfig.storybook
            ? {
                story_format: legacyConfig.storybook.use_mdx ? 'mdx' : 'csf',
                params: legacyConfig.storybook.params || undefined
            }
            : false,
        tests: legacyConfig.tests
            ? {
                extension: legacyConfig.tests.extension || 'spec'
            }
            : false,
        styles: legacyConfig.styles
            ? {
                preprocessor: legacyConfig.styles.preprocessor || false,
                modules: legacyConfig.styles.modules || false
            }
            : false,
        generate_readme: legacyConfig.generate_readme || false,
        extra_directories: legacyConfig.directories || [],
        prepopulate: legacyConfig.prepopulate || true
    };
    const configWithComments = (0, _helpers_1.configContents)(js_yaml_1.default.dump(config));
    fs_1.default.writeFileSync(configFileName, configWithComments, 'utf8');
};
exports.default = migrate;
