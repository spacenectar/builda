"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefabInit = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const glob_1 = __importDefault(require("glob"));
const execa_1 = __importDefault(require("execa"));
const globals_1 = __importDefault(require("../data/globals"));
const _helpers_1 = require("../helpers/index.js");
const string_functions_1 = __importDefault(require("../helpers/string-functions"));
const defaultRequiredFiles = ['.builda', 'package.json', 'README.md'];
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
        name: 'pathName',
        message: 'What is the path to the prefab?',
        default: 'github:builda-modules/prefab-test@latest',
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
    },
    {
        type: 'confirm',
        name: 'autoInstall',
        message: 'Would you like to auomatically install all dependencies?',
        default: true
    }
];
const getAnswers = async (omitName, omitPathName, omitYarnOrNpm) => {
    return new Promise((resolve) => {
        const questionList = questions.filter((question) => {
            if (omitName && question.name === 'appName') {
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
    const { buildaDir, websiteUrl } = globals_1.default;
    const answers = presetAnswers ||
        (await getAnswers(!!appName, !!pathName, !!packageManager));
    const name = appName || answers.appName;
    const outputDir = outputDirectory || answers.appName;
    const prefabPath = pathName || answers.pathName;
    const packageManagerType = packageManager || answers.yarnOrNpm || 'npm';
    await (0, _helpers_1.createDir)(outputDir);
    // check if the root directory is empty
    const rootDir = node_path_1.default.resolve(outputDir);
    const workingDir = node_path_1.default.join(outputDir, buildaDir, 'build');
    if (node_fs_1.default.readdirSync(rootDir).length !== 0) {
        return (0, _helpers_1.throwError)(`The directory: '${rootDir}' already exists. It is not recommended to install a prefab into an existing project.`);
    }
    else {
        await (0, _helpers_1.createDir)(workingDir);
        // The directory is empty, so we can continue
        let module = {};
        const moduleType = (0, _helpers_1.detectPathType)(prefabPath);
        if (moduleType === 'local') {
            module = await (0, _helpers_1.addLocalModule)(prefabPath, outputDir);
        }
        if (moduleType === 'remote') {
            module = await (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(prefabPath), outputDir);
        }
        if (moduleType === 'custom') {
            module = await (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(prefabPath), outputDir);
        }
        if (module === null || module === void 0 ? void 0 : module.name) {
            const prefabName = module.name;
            const version = module.version;
            const substitutions = module.substitute || [];
            const prefabDir = node_path_1.default.join(outputDir, buildaDir, 'modules/prefab', 'files');
            const requiredFiles = [
                ...defaultRequiredFiles,
                ...(module.custom_files || [])
            ];
            (0, _helpers_1.printMessage)(`Installed ${prefabName}@${version}`, 'success');
            (0, _helpers_1.printMessage)('Creating build path...', 'processing');
            // Copy the prefab files to the build directory
            (0, _helpers_1.copyDir)(prefabDir, workingDir);
            (0, _helpers_1.printMessage)('Build path created', 'success');
            (0, _helpers_1.printMessage)('Copying required files to application...', 'copying');
            const substitute = [
                ...substitutions,
                {
                    replace: '%APP_NAME%',
                    with: (0, string_functions_1.default)(name, 'kebabCase')
                },
                {
                    replace: '%APP_ROOT%',
                    with: './'
                },
                {
                    replace: '%PACKAGE_MANAGER%',
                    with: packageManagerType
                }
            ];
            const fileLoop = async (pathString) => {
                const promises = [];
                for (const file of pathString) {
                    const filePath = node_path_1.default.join(prefabDir, file);
                    // Check if file is glob
                    if (file.includes('*')) {
                        const globFiles = glob_1.default.sync(file);
                        promises.push(await fileLoop(globFiles));
                    }
                    else if (node_fs_1.default.lstatSync(filePath).isDirectory()) {
                        const files = node_fs_1.default.readdirSync(filePath);
                        const newFiles = files.map((f) => node_path_1.default.join(file, f));
                        promises.push(await fileLoop(newFiles));
                    }
                    else {
                        promises.push(new Promise((resolve) => {
                            const directoryPathWithoutFile = node_path_1.default.dirname(file);
                            const directoryPath = node_path_1.default.join(workingDir, directoryPathWithoutFile);
                            (0, _helpers_1.createDir)(directoryPath);
                            if (node_fs_1.default.existsSync(filePath)) {
                                (0, _helpers_1.writeFile)({
                                    file: filePath,
                                    output_dir: directoryPath,
                                    substitute,
                                    name
                                });
                            }
                            resolve(filePath);
                        }));
                    }
                }
                // Wait for all promises to resolve
                await Promise.all(promises);
            };
            // Copy all required files
            await fileLoop(requiredFiles);
            const buildaPath = node_path_1.default.join(workingDir, buildaDir);
            const buildaConfigPath = node_path_1.default.resolve(buildaPath, 'config.json');
            const rootBuildaPath = node_path_1.default.join(rootDir, buildaDir);
            // Copy config.json from working builda directory to root builda directory
            if (node_fs_1.default.existsSync(buildaConfigPath)) {
                node_fs_1.default.copyFileSync(buildaConfigPath, node_path_1.default.join(rootBuildaPath, 'config.json'));
            }
            // Create a new package.json file in the root directory with updated scripts
            const packageJson = require(node_path_1.default.resolve(workingDir, 'package.json'));
            const scripts = packageJson.scripts;
            const buildaScripts = {};
            Object.entries(scripts).map(([key]) => {
                buildaScripts[key] = `builda -x ${key}`;
            });
            const newPackageJson = Object.assign(Object.assign({}, packageJson), { scripts: buildaScripts });
            node_fs_1.default.writeFileSync(node_path_1.default.join(rootDir, 'package.json'), JSON.stringify(newPackageJson, null, 2));
            // Delete the .builda directory from the build directory
            if (node_fs_1.default.existsSync(buildaPath)) {
                node_fs_1.default.rmSync(buildaPath, { recursive: true });
            }
            // Install any blueprint dependencies
            if (module.blueprints) {
                (0, _helpers_1.printMessage)('Installing prefab blueprints...', 'installing');
                const blueprintPromises = [];
                // Convert the blueprints to an array
                const blueprints = Object.keys(module.blueprints);
                for (const blueprint of blueprints) {
                    const bp = module.blueprints[blueprint];
                    (0, _helpers_1.printMessage)(`installing ${blueprint}`, 'processing');
                    const blueprintDest = node_path_1.default.join(outputDir, buildaDir, 'modules', 'blueprints');
                    (0, _helpers_1.createDir)(blueprintDest);
                    if (bp.location === 'prefab') {
                        // Copy the 'blueprints' folder from the prefab to the .builda folder
                        const blueprintSrc = node_path_1.default.join(prefabDir, buildaDir, 'modules', 'blueprints', blueprint);
                        if (node_fs_1.default.existsSync(blueprintSrc)) {
                            (0, _helpers_1.copyDir)(blueprintSrc, node_path_1.default.join(blueprintDest, blueprint));
                        }
                    }
                    else {
                        // Install the blueprint from the registry
                        const bluePrintType = (0, _helpers_1.detectPathType)(bp.location);
                        blueprintPromises.push(new Promise((resolve) => {
                            if (bluePrintType === 'local') {
                                (0, _helpers_1.addLocalModule)(bp.location, outputDir);
                            }
                            if (bluePrintType === 'remote') {
                                (0, _helpers_1.addRemoteModule)((0, _helpers_1.convertRegistryPathToUrl)(bp.location), outputDir);
                            }
                            resolve(blueprint);
                        }));
                    }
                    (0, _helpers_1.printMessage)(`${blueprint} installed`, 'success');
                }
                await Promise.all(blueprintPromises);
            }
            (0, _helpers_1.printMessage)('All files copied to application.', 'success');
            if (answers.autoInstall) {
                (0, _helpers_1.printMessage)('Installing dependencies...', 'config');
                // Run package manager install
                if (node_fs_1.default.existsSync(node_path_1.default.resolve(workingDir, 'package.json'))) {
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
                        (0, _helpers_1.printMessage)(`Failed to run. Please try running '${packageManagerType} install' manually.`, 'error');
                        //TODO : Add this documentation
                        return (0, _helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
                    }
                }
                else {
                    return (0, _helpers_1.printMessage)('No package.json found. Skipping install.', 'notice');
                }
            }
            else {
                (0, _helpers_1.printMessage)(`Dependencies have not been installed. To install dependencies, run: '${packageManagerType} install'`, 'notice');
            }
            (0, _helpers_1.printMessage)(`Your application, "${name}" has been initialised!`, 'success');
            return (0, _helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
        }
        return (0, _helpers_1.throwError)('No prefab found');
    }
};
exports.prefabInit = prefabInit;
exports.default = exports.prefabInit;
