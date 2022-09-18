"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefabInit = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const execa_1 = __importDefault(require("execa"));
const globals_1 = __importDefault(require("../data/globals"));
const _helpers_1 = require("../helpers/index.js");
const defaultRequiredFiles = ['package.json', 'README.md'];
const questions = [
    {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        default: 'my-app',
        validate: (input) => {
            if (input.length) {
                return true;
            }
            else {
                return 'Please enter a name for your application';
            }
        }
    },
    {
        type: 'input',
        name: 'outputDirectory',
        message: 'Where would you like to output your application?',
        default: './test-path',
        validate: (input) => {
            if (input.length) {
                return true;
            }
            else {
                return 'Please enter a directory for your application';
            }
        }
    },
    {
        type: 'input',
        name: 'pathName',
        message: 'What is the path to the prefab?',
        default: 'github:builda-modules/prefab-test',
        validate: (input) => {
            if (input.length) {
                return true;
            }
            else {
                return 'Please enter a path to the prefab';
            }
        }
    },
    {
        type: 'list',
        name: 'yarnOrNpm',
        message: 'Which package manager would you like to use?',
        default: 'npm',
        choices: ['npm', 'yarn']
    }
];
const getAnswers = async (omitName, omitOutputDir, omitPathName, omitYarnOrNpm) => {
    return new Promise((resolve) => {
        const questionList = questions.filter((question) => {
            if (omitName && question.name === 'appName') {
                return false;
            }
            if (omitOutputDir && question.name === 'outputDirectory') {
                return false;
            }
            if (omitPathName && question.name === 'pathName') {
                return false;
            }
            if (omitYarnOrNpm && question.name === 'yarnOrNpm') {
                return false;
            }
            return true;
        });
        (0, _helpers_1.askQuestion)({
            questionList
        }).then((answers) => {
            return resolve(answers);
        });
    });
};
const prefabInit = async ({ presetAnswers, appName, outputDirectory, pathName, packageManager }) => {
    var _a;
    const { configFileName, buildaDir, websiteUrl } = globals_1.default;
    const answers = presetAnswers ||
        (await getAnswers(!!appName, !!outputDirectory, !!pathName, !!packageManager));
    const name = appName || answers.appName;
    const outputDir = outputDirectory || answers.outputDirectory;
    const prefabPath = pathName || answers.pathName;
    const packageManagerType = packageManager || answers.yarnOrNpm || 'npm';
    await (0, _helpers_1.createDir)(outputDir);
    // check if the root directory is empty
    const rootDir = node_path_1.default.resolve(outputDir);
    if (node_fs_1.default.readdirSync(rootDir).length !== 0) {
        return (0, _helpers_1.throwError)(`The directory: '${rootDir}' is not empty. It is not recommended to install a prefab into an existing project.`);
    }
    else {
        // The directory is empty, so we can continue
        let module = {};
        const moduleType = (0, _helpers_1.detectPathType)(prefabPath);
        if (moduleType === 'local') {
            module = await (0, _helpers_1.addLocalModule)(prefabPath);
        }
        if (moduleType === 'remote') {
            module = await (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(prefabPath));
        }
        if (moduleType === 'custom') {
            module = await (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(prefabPath));
        }
        if (module === null || module === void 0 ? void 0 : module.name) {
            const prefabName = module.name;
            const version = module.version;
            const substitutions = module.substitute || [];
            const requiredFiles = [
                ...defaultRequiredFiles,
                ...(module.required_in_root || [])
            ];
            (0, _helpers_1.printMessage)(`Installed ${prefabName}@${version}`, 'success');
            (0, _helpers_1.printMessage)('Copying required files to application...', 'copying');
            // Initialise a promise
            const promises = [];
            const substitute = [
                ...substitutions,
                {
                    replace: '%APP_ROOT%',
                    with: outputDir
                }
            ];
            const prefabDir = `${buildaDir}/modules/prefabs/${prefabName}/files`;
            // Generate the correct files in the app directory
            (0, _helpers_1.writeFile)({
                file: node_path_1.default.resolve(prefabDir, buildaDir, configFileName),
                output_dir: buildaDir,
                substitute,
                name
            });
            for (const file of requiredFiles) {
                promises.push(new Promise((resolve) => {
                    const filePath = node_path_1.default.resolve(prefabDir, file);
                    if (node_fs_1.default.existsSync(filePath)) {
                        (0, _helpers_1.writeFile)({
                            file: node_path_1.default.resolve(prefabDir, filePath),
                            output_dir: rootDir,
                            substitute,
                            name
                        });
                    }
                    resolve(filePath);
                }));
            }
            (0, _helpers_1.printMessage)('All files copied to application.', 'success');
            // Wait for all promises to resolve
            await Promise.all(promises);
            (0, _helpers_1.printMessage)('Installing dependencies...', 'config');
            // Run package manager install
            if (node_fs_1.default.existsSync(node_path_1.default.resolve(rootDir, 'package.json'))) {
                (0, _helpers_1.printMessage)(`Running ${packageManagerType} install`, 'processing');
                try {
                    const childProcess = (0, execa_1.default)(packageManagerType, ['install'], {
                        cwd: rootDir,
                        all: true
                    });
                    (_a = childProcess === null || childProcess === void 0 ? void 0 : childProcess.all) === null || _a === void 0 ? void 0 : _a.pipe(process.stdout);
                    await childProcess;
                    (0, _helpers_1.printMessage)('All dependencies installed.', 'success');
                }
                catch (error) {
                    (0, _helpers_1.printMessage)('Failed to run. Please try running manually.', 'error');
                    return (0, _helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
                }
            }
            else {
                return (0, _helpers_1.printMessage)('No package.json found. Skipping install.', 'notice');
            }
            (0, _helpers_1.printMessage)(`Your application, "${name}" has been initialised!`, 'success');
            return (0, _helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
        }
        return (0, _helpers_1.throwError)('No prefab found');
    }
};
exports.prefabInit = prefabInit;
exports.default = exports.prefabInit;
