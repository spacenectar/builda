#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
// import helpers
const _helpers_1 = require("./helpers/index.js");
// import data
const arguments_json_1 = __importDefault(require("./data/arguments.json"));
// import scripts
const init_1 = __importDefault(require("./scripts/init"));
const generate_commands_1 = __importDefault(require("./scripts/generate-commands"));
const build_from_scaffold_1 = __importDefault(require("./scripts/build-from-scaffold"));
const add_module_1 = __importDefault(require("./scripts/add-module"));
const args = (0, helpers_1.hideBin)(process.argv);
const config = (0, _helpers_1.getConfigFile)();
const parser = (0, yargs_1.default)(args)
    .usage('Usage: $0 [options]')
    .options(arguments_json_1.default)
    .help('h')
    .version()
    .alias('h', 'help');
(0, _helpers_1.printLogo)();
const CREATE_CONFIG_QUESTION = {
    message: 'Would you like to create a .builda config?',
    name: 'createConfig',
    type: 'confirm'
};
(async () => {
    const argv = await parser.argv;
    if (args.length === 0 && config) {
        // No arguments were passed but a config file exists
        (0, _helpers_1.printMessage)('No arguments provided.\r', 'danger');
        parser.showHelp();
    }
    if ((args.length === 0 || !argv.manual) && !config) {
        (0, _helpers_1.printMessage)('Builda config not detected.\r', 'danger');
        // No arguments were passed but a config file does not exist
        return (0, _helpers_1.askQuestion)(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
            if (createConfig) {
                return (0, init_1.default)({});
            }
            (0, _helpers_1.printMessage)('Process terminated due to user selection', 'error');
            return process.exit(1);
        });
    }
    if (argv.init)
        (0, init_1.default)({});
    if (argv.manual) {
        (0, _helpers_1.printMessage)('Manual mode selected.\r', 'notice');
        return (0, _helpers_1.printMessage)('🛠 This route does not exist yet.\r', 'notice');
    }
    if (argv._[0].toString() === 'add') {
        const module = argv._[1].toString();
        return (0, add_module_1.default)(module);
    }
    if (argv.migrate) {
        // The user wants to migrate an old buildcom config file
        // Go to migrate function
        return (0, _helpers_1.printMessage)('🛠 This route does not exist yet.\r', 'notice');
    }
    const commands = config ? (0, generate_commands_1.default)() : [];
    const commandString = process.argv[2].replace('--', '');
    const command = commands.find((c) => c.name === commandString);
    if (command) {
        const name = argv._[1].toString();
        const prefix = argv.prefix ? argv.prefix : '';
        if (prefix) {
            const allowedPrefixes = command.substitute.prefix;
            if (!allowedPrefixes.includes(prefix)) {
                return (0, _helpers_1.printMessage)(`Prefix ${prefix} is not allowed.`, 'error');
            }
        }
        return (0, build_from_scaffold_1.default)({
            name,
            command: command.name,
            substitute: prefix
        });
    }
    else {
        return (0, _helpers_1.printMessage)(`'${command}' is not a recognised command.\r`, 'danger');
    }
})();
