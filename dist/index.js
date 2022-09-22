#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const node_process_1 = __importDefault(require("node:process"));
// import helpers
const _helpers_1 = require("./helpers/index.js");
// import data
const arguments_json_1 = __importDefault(require("./data/arguments.json"));
const globals_1 = __importDefault(require("./data/globals"));
// import scripts
const init_1 = __importDefault(require("./scripts/init"));
const generate_commands_1 = __importDefault(require("./scripts/generate-commands"));
const build_from_blueprint_1 = __importDefault(require("./scripts/build-from-blueprint"));
const add_module_1 = __importDefault(require("./scripts/add-module"));
const watch_1 = __importDefault(require("./scripts/watch"));
const build_from_prefabs_1 = __importDefault(require("./scripts/build-from-prefabs"));
const update_module_1 = require("./scripts/update-module");
const prefab_init_1 = __importDefault(require("./scripts/prefab-init"));
const execute_1 = __importDefault(require("./scripts/execute"));
const generate_indexes_1 = require("./scripts/generate-indexes");
// Check to see if the command is being run from the root of the project or from the .builda/export directory
// If it's being run from the export directory, then we need to change the working directory to the root of the project
const cwd = node_process_1.default.cwd();
const isExportDir = cwd.includes(`${globals_1.default.buildaDir}/export`);
if (isExportDir) {
    node_process_1.default.chdir('../..');
}
const args = (0, helpers_1.hideBin)(node_process_1.default.argv);
const { configFileName, websiteUrl } = globals_1.default;
const parser = (0, yargs_1.default)(args)
    .usage('Usage: $0 [options]')
    .options(arguments_json_1.default)
    .help('h')
    .version()
    .alias('h', 'help')
    .epilogue(`For more information, visit ${websiteUrl}`);
const CREATE_CONFIG_QUESTION = {
    message: `Would you like to create a ${configFileName} config?`,
    name: 'createConfig',
    type: 'confirm'
};
(async () => {
    const argv = await parser.argv;
    const config = await (0, _helpers_1.getConfigFile)();
    if (config) {
        // The following commands are available when a config file is present
        if (args.length === 0) {
            (0, _helpers_1.printLogo)();
            // No arguments were passed but a config file exists
            (0, _helpers_1.printMessage)('No arguments provided.\r', 'danger');
            parser.showHelp();
            return node_process_1.default.exit(0);
        }
        if (argv.init) {
            (0, _helpers_1.printLogo)();
            (0, _helpers_1.printMessage)(`A ${configFileName} has been found. Please delete it before continuing.\r`, 'danger');
            return node_process_1.default.exit(0);
        }
        if (argv.watch || argv.w) {
            (0, _helpers_1.printLogo)();
            // The user is watching the app for changes
            // Go to watch function
            return (0, watch_1.default)(config);
        }
        if (argv.build) {
            (0, _helpers_1.printLogo)();
            // The user wants to build the app
            // Go to build function
            return (0, build_from_prefabs_1.default)(config);
        }
        if (argv.index) {
            (0, _helpers_1.printLogo)();
            // The user wants to generate indexes
            // Go to generate indexes function
            return (0, generate_indexes_1.generateIndexes)(config);
        }
        if (argv.execute || argv.x) {
            // The user wants to execute a command
            // Go to execute function
            const command = (argv.execute || argv.x);
            return (0, execute_1.default)(config, command);
        }
        if (argv._[0].toString() === 'add') {
            (0, _helpers_1.printLogo)();
            const module = argv._[1].toString();
            return (0, add_module_1.default)({ config, modulePath: module });
        }
        if (argv._[0].toString() === 'update') {
            (0, _helpers_1.printLogo)();
            const module = argv._[1].toString();
            return (0, update_module_1.updateModule)({ config, module });
        }
    }
    if (args.length === 0 && !argv.manual && !config) {
        (0, _helpers_1.printLogo)();
        // No arguments were passed but a config file does not exist
        return (0, _helpers_1.askQuestion)(CREATE_CONFIG_QUESTION).then(({ createConfig }) => {
            if (createConfig) {
                return (0, init_1.default)({});
            }
            (0, _helpers_1.printMessage)('Process terminated due to user selection', 'error');
            return node_process_1.default.exit(0);
        });
    }
    // The following commands are available without a config file
    if (argv.manual) {
        (0, _helpers_1.printLogo)();
        (0, _helpers_1.printMessage)('Manual mode selected.\r', 'notice');
        (0, _helpers_1.printMessage)('🛠 This route does not exist yet.\r', 'notice');
        return node_process_1.default.exit(0);
    }
    if (argv.migrate) {
        (0, _helpers_1.printLogo)();
        // The user wants to migrate an old buildcom config file
        // Go to migrate function
        return (0, _helpers_1.printMessage)('🛠 This route does not exist yet.\r', 'notice');
    }
    if (argv.init) {
        (0, _helpers_1.printLogo)();
        const name = argv.name || argv.n || '';
        const output = argv.root || argv.r || '';
        return (0, init_1.default)({
            appName: name,
            outputDirectory: output
        });
    }
    if (argv.prefab || argv.p) {
        (0, _helpers_1.printLogo)();
        const name = argv.name || argv.n || '';
        const output = argv.root || argv.r || '';
        const pathName = argv.prefabPath || argv.pp || '';
        const packageManager = argv.packageManager || argv.pm || '';
        return (0, prefab_init_1.default)({
            appName: name,
            outputDirectory: output,
            pathName: pathName,
            packageManager: packageManager
        });
    }
    const commands = config ? (0, generate_commands_1.default)(config) : {};
    const commandString = node_process_1.default.argv[2].replace('--', '');
    const command = commands[commandString];
    if (command) {
        (0, _helpers_1.printLogo)();
        const name = argv._[1].toString();
        return (0, build_from_blueprint_1.default)({
            config,
            name,
            command,
            args: argv
        });
    }
    else {
        return (0, _helpers_1.printMessage)(`'${command}' is not a recognised command.\r`, 'danger');
    }
})();
