"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const _helpers_1 = require("../../helpers/index.js");
const arguments_json_1 = __importDefault(require("../../data/arguments.json"));
const init_1 = __importDefault(require("./init"));
const migrate_1 = __importDefault(require("./migrate"));
const config_file_mode_1 = __importDefault(require("./config-file-mode"));
const get_config_from_arguments_1 = __importDefault(require("./get-config-from-arguments"));
const args = process.argv.slice(2);
const config = (0, config_file_mode_1.default)();
const parser = (0, yargs_1.default)(args)
    .usage('Usage: $0 [options]')
    .options(arguments_json_1.default)
    .help('h')
    .version()
    .alias('h', 'help')
    .command('<name..>', 'Create a new component');
const NAME_COMPONENT_QUESTION = {
    message: 'What would you like to name your component?',
    name: 'componentName',
    defaultValue: (0, _helpers_1.randomWordGenerator)(),
    validate: (value) => _helpers_1.directoryRegex.test(value) ? true : 'Component name is invalid'
};
const CREATE_CONFIG_QUESTION = {
    message: 'Would you like to create a .buildcomrc file?',
    name: 'createConfig',
    type: 'confirm'
};
exports.default = async () => {
    const argv = await parser.argv;
    if (args.length === 0 && config) {
        // No arguments were passed but a config file exists
        (0, _helpers_1.printMessage)('🚀 .buildcomrc file detected.\r', 'success');
        // Ask user what they want to call their component
        return (0, _helpers_1.askQuestion)(NAME_COMPONENT_QUESTION).then(({ componentName }) => {
            return Object.assign({ component_names: [componentName] }, config);
        });
    }
    if (args.length === 0 && !config) {
        // No arguments were passed but a config file does not exist
        (0, _helpers_1.printMessage)('No arguments were passed and no .builda.yml was found.\r', 'warning');
        return (0, _helpers_1.askQuestion)(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
            createConfig
                ? console.log('created file') // TODO: Add init function
                : (0, _helpers_1.printMessage)('Process terminated due to user selection', 'error');
            process.exit(1);
        });
    }
    if (argv.init) {
        // The user wants to create a config file
        // Go to init function
        return (0, init_1.default)();
    }
    if (argv.migrate) {
        // The user wants to migrate an old buildcom config file
        // Go to migrate function
        return (0, migrate_1.default)();
    }
    // Arguments were passed
    return (0, get_config_from_arguments_1.default)(argv);
};
