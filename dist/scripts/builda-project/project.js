"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const execa_1 = __importDefault(require("execa"));
const inquirer_1 = __importDefault(require("inquirer"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const globals_1 = __importDefault(require("../../data/globals"));
const helpers_1 = require("../../helpers");
/**
 * Generate a new project from a prefab
 * @param { TGenerateProject }
 */
exports.default = async ({ appName, appRoot, cliPrefabPath, packageManager, autoInstall, smokeTest }) => {
    var _a, _b, _c;
    const { buildaDir, websiteUrl, configFileName, buildaReadmeFileName } = globals_1.default;
    const defaultRequiredFiles = [
        buildaDir,
        `${buildaDir}/${configFileName}`,
        'package.json',
        'README.md'
    ];
    let answers = {};
    if (!cliPrefabPath) {
        const { usePrefab } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'usePrefab',
                message: `Do you want to set the project up using a prefab?`,
                default: true
            }
        ]);
        if (usePrefab) {
            const prefabAnswers = await (0, helpers_1.prefabQuestions)(answers);
            answers.prefab = prefabAnswers.prefabUrl || prefabAnswers.prefabList;
        }
        else {
            (0, helpers_1.showHelp)('You can set up a project from scratch by answering a few questions about your project.\r\n\n' +
                `If you are unsure about any of these, you can always change them later by editing the ${configFileName} file.`);
        }
        if (answers.prefab) {
            (0, helpers_1.showHelp)('Great! That prefab is ready to install!\n\nFirst things first though, we need a few more details, to get you set up.', 'success');
        }
    }
    let newProjectAnswers = {};
    if (!appRoot || !appName || !packageManager) {
        newProjectAnswers = await (0, helpers_1.newProjectQuestions)();
    }
    answers = Object.assign(Object.assign({}, answers), newProjectAnswers);
    const name = (appName || answers.appName);
    const prefabPath = (cliPrefabPath || answers.prefab);
    const packageManagerType = packageManager || answers.yarnOrNpm || 'npm';
    const rootDir = appRoot || answers.appRoot || node_process_1.default.cwd();
    const kebabAppName = (0, helpers_1.changeCase)(name, 'kebabCase');
    await (0, helpers_1.createDir)(kebabAppName);
    // Change directory to the new app
    node_process_1.default.chdir(kebabAppName);
    // check if the root directory is empty
    const workingDir = node_path_1.default.join(rootDir, buildaDir, 'export');
    const prefabDir = node_path_1.default.join(rootDir, buildaDir, 'modules', 'prefab');
    if (node_fs_1.default.readdirSync(rootDir).length !== 0) {
        (0, helpers_1.throwError)(`The directory: '${rootDir}' already exists. It is not recommended to install a prefab into an existing project.`);
    }
    await (0, helpers_1.createDir)(workingDir);
    // The directory is empty, so we can continue
    let module = {};
    // If the user isn't using a prefab, we can just create a config and then skip the rest of this file
    if (prefabPath) {
        if ((0, helpers_1.detectPathType)(prefabPath) === 'remote') {
            const registry = (0, helpers_1.convertRegistryPathToUrl)({
                registryPath: prefabPath
            }).url;
            if (!registry) {
                (0, helpers_1.throwError)('No registry found');
            }
            module = await (0, helpers_1.addRemoteModule)(registry, rootDir);
        }
        else {
            module = await (0, helpers_1.addLocalModule)(prefabPath, rootDir);
        }
        if (!(module === null || module === void 0 ? void 0 : module.name)) {
            (0, helpers_1.throwError)('No prefab found');
        }
        const prefabName = module.name;
        const version = module.version;
        const substitutions = module.substitute || [];
        const extraRootfiles = ((_a = module.appFiles) === null || _a === void 0 ? void 0 : _a.filter((file) => {
            if (!file.rewrite) {
                return file;
            }
            return false;
        }).map((f) => f.path)) || [];
        const extraRootfilesToRewrite = ((_b = module.appFiles) === null || _b === void 0 ? void 0 : _b.filter((file) => {
            if (file.rewrite) {
                return file;
            }
            return false;
        })) || [];
        const requiredFiles = [...defaultRequiredFiles, ...(extraRootfiles || [])];
        (0, helpers_1.printMessage)(`Installed ${prefabName}@${version}`, 'success');
        (0, helpers_1.printMessage)('Creating export path...', 'processing');
        // Copy the prefab files to the export directory
        (0, helpers_1.copyDir)(prefabDir, workingDir);
        (0, helpers_1.printMessage)('Export path created', 'success');
        (0, helpers_1.printMessage)('Copying required files to application...', 'copying');
        const substitute = [
            ...substitutions,
            {
                replace: '%APP_NAME%',
                with: (0, helpers_1.changeCase)(name, 'kebabCase')
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
        // Copy all required files
        await (0, helpers_1.loopAndRewriteFiles)({ name, paths: requiredFiles, substitute });
        const buildaPath = node_path_1.default.join(workingDir, buildaDir);
        const buildaConfigPath = node_path_1.default.resolve(buildaPath, configFileName);
        // If there are extra files which need to be rewritten, do that now
        if (extraRootfilesToRewrite.length > 0) {
            const paths = extraRootfilesToRewrite.map((f) => f.path);
            const extraSubstitutions = extraRootfilesToRewrite
                .map((f) => f.substitutions)
                .flat()
                .concat(substitutions);
            await (0, helpers_1.loopAndRewriteFiles)({
                name,
                paths,
                substitute: extraSubstitutions
            });
        }
        //TODO: We need a function to loop through the appFiles and copy them to the root directory. There should possibly also
        // be a sync function to copy the files back to the export directory. This could be part of the 'build' command.
        // It would also be good if users could choose to add the path to the files they want to the `appFiles` array in the
        // config file OR just copy the files manually. Either way, the `build` function should keep both the files and the config
        // in sync, e.g. Any files added to the root dir should appear in the `appFiles` array on build and vice versa.
        // Copy config.json from working builda directory to root directory
        if (node_fs_1.default.existsSync(buildaConfigPath)) {
            node_fs_1.default.copyFileSync(buildaConfigPath, node_path_1.default.join(rootDir, configFileName));
        }
        // Create a new package.json file in the root directory with updated scripts
        const packageJsonFile = node_fs_1.default.readFileSync(node_path_1.default.resolve(workingDir, 'package.json'), {
            encoding: 'utf8'
        });
        const packageJson = JSON.parse(packageJsonFile);
        const scripts = packageJson.scripts;
        const buildaScripts = {};
        Object.entries(scripts).forEach(([key, value]) => {
            if (value.startsWith('builda') ||
                value.startsWith('run-s') ||
                value.startsWith('run-p') ||
                value.startsWith('npm-run-all') ||
                value.startsWith('concurrently')) {
                // We don't want to replace `builda`, `npm-run-all` or `concurrently` scripts, so we just copy them over
                // TODO: Add docs to show that builda scripts should not be used in conjunction with other scripts
                // add a suggestion to put the builda script in its own script and call that script from the other
                // script using one of the supported methods
                /**
                 * e.g.
                 * {
                 *   "watch": "builda --watch",
                 *   "dev": "run-p watch other-script"
                 * }
                 */
                buildaScripts[key] = value;
            }
            else {
                buildaScripts[key] = `builda -x ${key}`;
            }
        });
        // If there is a 'uniqueInstances' array in the config file, loop through and copy the .unique version of those files
        // to the root directory without the .unique extension
        if (module.uniqueInstances && module.uniqueInstances.length > 0) {
            module.uniqueInstances.forEach((file) => {
                const rewrite = file.rewrite || false;
                const uniqueFile = node_path_1.default.join(workingDir, file.path);
                const uniqueFileSrcDir = node_path_1.default.dirname(uniqueFile);
                if (rewrite) {
                    const uniqueFileContents = node_fs_1.default.readFileSync(uniqueFile, {
                        encoding: 'utf8'
                    });
                    const uniqueFileSubs = [...substitute, file.substitutions].flat() || substitute;
                    (0, helpers_1.writeFile)({
                        file: uniqueFile,
                        content: uniqueFileContents,
                        substitute: uniqueFileSubs,
                        name: appName,
                        rename: uniqueFile.replace('.unique', ''),
                        outputDir: uniqueFileSrcDir.replace(workingDir, rootDir)
                    });
                }
                else {
                    node_fs_1.default.copyFileSync(uniqueFile, node_path_1.default.join(uniqueFileSrcDir.replace(workingDir, rootDir), file.path.replace('.unique', '')));
                }
            });
        }
        // Create a new package.json file in the root directory with updated details
        const newPackageJson = Object.assign(Object.assign({}, packageJson), { scripts: buildaScripts });
        node_fs_1.default.writeFileSync(node_path_1.default.join(rootDir, 'package.json'), JSON.stringify(newPackageJson, null, 2));
        // Add the default prefab readme to the root directory
        const prefabReadmeUrl = `${websiteUrl}/assets/prefab-getting-started.md`;
        const readmeSubs = [
            {
                replace: '%PREFAB_NAME%',
                with: prefabName
            },
            {
                replace: '%PREFAB_URL%',
                with: module.url
            },
            {
                replace: '%PREFAB_VERSION%',
                with: version
            }
        ];
        // Download the prefab readme and add it to the root directory
        // If the download fails, we just ignore it and continue with a warning message
        await axios_1.default
            .get(prefabReadmeUrl, {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
            .then((res) => {
            if (res.status === 200) {
                (0, helpers_1.writeFile)({
                    content: res.data,
                    rename: buildaReadmeFileName,
                    outputDir: rootDir,
                    substitute: readmeSubs
                });
            }
        })
            .catch((err) => {
            console.log(err);
            (0, helpers_1.printMessage)(`Could not download the getting started file. Visit ${websiteUrl}/docs/getting-started#prefab for assistance`, 'warning');
        });
        // Delete the .builda directory from the export directory
        if (node_fs_1.default.existsSync(buildaPath)) {
            node_fs_1.default.rmSync(buildaPath, { recursive: true });
        }
        // Install any blueprint dependencies
        if (module.blueprints) {
            (0, helpers_1.printMessage)('Installing prefab blueprints...', 'installing');
            const blueprintPromises = [];
            // Convert the blueprints to an array
            const blueprints = Object.keys(module.blueprints);
            for (const blueprint of blueprints) {
                const bp = module.blueprints[blueprint];
                (0, helpers_1.printMessage)(`installing ${blueprint}`, 'processing');
                const blueprintDest = node_path_1.default.join(rootDir, buildaDir, 'modules', 'blueprints');
                (0, helpers_1.createDir)(blueprintDest);
                if (bp.location === 'prefab') {
                    // Copy the 'blueprints' folder from the prefab to the .builda folder
                    const blueprintSrc = node_path_1.default.join(prefabDir, buildaDir, 'modules', 'blueprints', blueprint);
                    if (node_fs_1.default.existsSync(blueprintSrc)) {
                        (0, helpers_1.copyDir)(blueprintSrc, node_path_1.default.join(blueprintDest, blueprint));
                    }
                }
                else {
                    // Install the blueprint from the registry
                    const bluePrintType = (0, helpers_1.detectPathType)(bp.location);
                    blueprintPromises.push(new Promise((resolve) => {
                        if (bluePrintType === 'local') {
                            (0, helpers_1.addLocalModule)(bp.location, rootDir);
                        }
                        if (bluePrintType === 'remote') {
                            const registry = (0, helpers_1.convertRegistryPathToUrl)({
                                registryPath: bp.location
                            }).url;
                            if (!registry) {
                                (0, helpers_1.throwError)('No registry found');
                            }
                            (0, helpers_1.addRemoteModule)(registry, rootDir);
                        }
                        resolve(blueprint);
                    }));
                }
                (0, helpers_1.printMessage)(`${blueprint} installed`, 'success');
            }
            await Promise.all(blueprintPromises);
        }
        (0, helpers_1.printMessage)('All files copied to application.', 'success');
        if (autoInstall || answers.autoInstall) {
            (0, helpers_1.printMessage)('Installing dependencies...', 'config');
            // Run package manager install
            if (node_fs_1.default.existsSync(node_path_1.default.resolve(workingDir, 'package.json'))) {
                (0, helpers_1.printMessage)(`Running ${packageManagerType} install`, 'processing');
                try {
                    const childProcess = (0, execa_1.default)(packageManagerType, ['install'], {
                        cwd: rootDir,
                        all: true,
                        stdio: 'inherit'
                    });
                    (_c = childProcess === null || childProcess === void 0 ? void 0 : childProcess.all) === null || _c === void 0 ? void 0 : _c.pipe(node_process_1.default.stdout);
                    await childProcess;
                    (0, helpers_1.printMessage)('All dependencies installed.', 'success');
                }
                catch (error) {
                    (0, helpers_1.printMessage)(`Failed to run. Please try running '${packageManagerType} install' manually.`, 'error');
                    //TODO : Add this documentation
                    (0, helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
                }
            }
            else {
                (0, helpers_1.printMessage)('No package.json found. Skipping install.', 'notice');
            }
        }
        else {
            (0, helpers_1.printMessage)(`Dependencies have not been installed. To install dependencies, run: '${packageManagerType} install'`, 'notice');
        }
    }
    else {
        const config = {
            name,
            rootDir,
            packageManager: packageManagerType
        };
        node_fs_1.default.writeFileSync(`${buildaDir}/${configFileName}`, JSON.stringify(config, null, 2));
    }
    (0, helpers_1.printMessage)(`Your application, "${name}" has been initialised!`, 'success');
    if (smokeTest) {
        (0, helpers_1.printMessage)(`This was a smoke test. No files were created.`, 'primary');
        node_fs_1.default.rmSync(name, { recursive: true, force: true });
    }
    else {
        (0, execa_1.default)('cd', [name]);
        (0, helpers_1.printMessage)(`For more information about how to use your application, visit: ${websiteUrl}/docs/getting-started`, 'primary');
    }
};
