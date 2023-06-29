"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa_1 = __importDefault(require("execa"));
const inquirer_1 = __importDefault(require("inquirer"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const globals_1 = __importDefault(require("../../data/globals"));
const helpers_1 = require("../../helpers");
const generate_from_prefab_1 = require("./helpers/generate-from-prefab");
/**
 * Generate a new project from a prefab
 * @param { TGenerateProject }
 */
exports.default = async ({ appName, prefab, smokeTest }) => {
    const { buildaDir, websiteUrl, buildaReadmeFileName } = globals_1.default;
    const defaultRequiredFiles = [buildaDir, 'package.json', 'README.md'];
    let answers = {};
    if (!prefab) {
        const { usePrefab } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'usePrefab',
                message: `Do you want to set the project up using a prefab?`,
                default: true
            }
        ]);
        if (usePrefab) {
            const prefabAnswers = await (0, helpers_1.prefabQuestions)();
            answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
        }
        else {
            (0, helpers_1.showHelp)('You can set up a project from scratch by answering a few questions about your project.\r\n\n' +
                `If you are unsure about any of these, you can always change them later by editing the 'builda' section of your package.json file.`);
        }
        if (answers.prefab) {
            (0, helpers_1.showHelp)('Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.', 'success');
        }
    }
    let newProjectAnswers = {};
    if (!prefab || !appName) {
        newProjectAnswers = await (0, helpers_1.newProjectQuestions)();
    }
    answers = Object.assign(Object.assign({}, answers), newProjectAnswers);
    const name = (appName || answers.appName);
    const prefabPath = (prefab || answers.prefab);
    const kebabAppName = (0, helpers_1.changeCase)(name, 'kebabCase');
    const rootDir = node_path_1.default.join(node_process_1.default.cwd(), kebabAppName);
    await (0, helpers_1.createDir)(kebabAppName);
    // Change directory to the new app
    node_process_1.default.chdir(kebabAppName);
    // check if the root directory is empty
    const workingDir = node_path_1.default.join(rootDir, buildaDir, 'export');
    const prefabDir = node_path_1.default.join(rootDir, buildaDir, 'modules', 'prefab');
    if (node_fs_1.default.readdirSync(rootDir).length !== 0) {
        (0, helpers_1.throwError)(`The directory: '${kebabAppName}' already exists. It is not recommended to install a prefab into an existing project.`);
    }
    await (0, helpers_1.createDir)(workingDir);
    // The directory is empty, so we can continue
    const module = {};
    // If the user isn't using a prefab, we can just create a config and then skip the rest of this file
    if (prefabPath) {
        await (0, generate_from_prefab_1.generateFromPrefab)(prefabPath, module, rootDir, defaultRequiredFiles, prefabDir, workingDir, name, buildaDir, websiteUrl, buildaReadmeFileName);
    }
    (0, helpers_1.printMessage)(`Your application, "${name}" has been initialised!`, 'success');
    if (smokeTest) {
        node_process_1.default.chdir('../');
        node_fs_1.default.rm(name, { recursive: true, force: true }, (err) => {
            if (err) {
                console.log(err);
            }
            (0, helpers_1.printMessage)(`This was a smoke test. No files were created.`, 'primary');
        });
    }
    else {
        (0, execa_1.default)('cd', [name]); // TODO: This doesn't work
        (0, helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
    }
};
