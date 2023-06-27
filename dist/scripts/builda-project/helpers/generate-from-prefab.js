"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFromPrefab = void 0;
const axios_1 = __importDefault(require("axios"));
const execa_1 = __importDefault(require("execa"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const helpers_1 = require("../../../helpers");
async function generateFromPrefab(prefabPath, module, rootDir, defaultRequiredFiles, prefabDir, workingDir, name, packageManagerType, buildaDir, configFileName, appName, websiteUrl, buildaReadmeFileName, autoInstall, answers) {
    var _a, _b, _c, _d, _e, _f, _g;
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
    const substitutions = ((_a = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _a === void 0 ? void 0 : _a.substitutions) || [];
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
    await (0, helpers_1.loopAndRewriteFiles)({ name, paths: defaultRequiredFiles, substitute });
    const buildaPath = node_path_1.default.join(workingDir, buildaDir);
    const buildaConfigPath = node_path_1.default.resolve(buildaPath, configFileName);
    const rootFiles = ((_b = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _b === void 0 ? void 0 : _b.rootFiles) || [];
    // Copy all rootFiles into the application root
    await (0, helpers_1.copyPathsToRoot)(rootFiles, rootDir);
    // Create any extraFolders in the application root
    (_d = (_c = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _c === void 0 ? void 0 : _c.extraFolders) === null || _d === void 0 ? void 0 : _d.forEach(async (folder) => {
        node_fs_1.default.mkdirSync(node_path_1.default.join(rootDir, folder), { recursive: true });
        // add a .gitkeep file to the folder
        node_fs_1.default.writeFileSync(node_path_1.default.join(rootDir, folder, '.gitkeep'), '');
    });
    // Copy any applicationOnlyFiles to the application root and rewrite them
    // TODO:
    // - only rewrite files that have substitutions
    // - This isn't working for some reason, the substitutions aren't being applied
    (_f = (_e = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _e === void 0 ? void 0 : _e.applicationOnlyFiles) === null || _f === void 0 ? void 0 : _f.forEach(async (file) => {
        const prefabDir = node_path_1.default.join(buildaDir, 'modules', 'prefab');
        const filePath = node_path_1.default.join(prefabDir, file.path);
        const outputDir = node_path_1.default.join(rootDir, node_path_1.default.dirname(file.path));
        // Check if the file is a directory
        if (node_fs_1.default.lstatSync(filePath).isDirectory()) {
            throw new Error('Directories are not allowed in applicationOnlyFiles, please use rootFiles instead');
        }
        else {
            // Copy the file to the root directory
            await (0, helpers_1.writeFile)({
                file: filePath,
                outputDir,
                substitute: file.substitutions,
                name
            });
        }
    });
    // Copy builda.json from working builda directory to root directory and add the version number
    if (node_fs_1.default.existsSync(buildaConfigPath)) {
        const buildaConfig = JSON.parse(node_fs_1.default.readFileSync(buildaConfigPath, {
            encoding: 'utf8'
        }));
        buildaConfig.version = version;
        node_fs_1.default.writeFileSync(node_path_1.default.join(rootDir, configFileName), JSON.stringify(buildaConfig, null, 2));
    }
    // Create a new package.json file in the root directory
    const packageJsonFile = node_fs_1.default.readFileSync(node_path_1.default.resolve(workingDir, 'package.json'), {
        encoding: 'utf8'
    });
    const packageJson = JSON.parse(packageJsonFile);
    // Update the scripts entry to use 'builda execute'
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
            buildaScripts[key] = `builda x ${key}`;
        }
    });
    // Create a 'builda' entry with the path to the current prefab and version:
    const buildaEntry = {
        prefab: {
            name: prefabName,
            version: version,
            path: prefabPath
        }
    };
    // Create a new package.json file in the root directory with updated details
    const newPackageJson = Object.assign(Object.assign({}, packageJson), { scripts: buildaScripts, builda: buildaEntry });
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
                (_g = childProcess === null || childProcess === void 0 ? void 0 : childProcess.all) === null || _g === void 0 ? void 0 : _g.pipe(node_process_1.default.stdout);
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
    return module;
}
exports.generateFromPrefab = generateFromPrefab;
