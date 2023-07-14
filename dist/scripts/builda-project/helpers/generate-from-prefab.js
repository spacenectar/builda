"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFromPrefab = void 0;
const axios_1 = __importDefault(require("axios"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const helpers_1 = require("../../../helpers");
async function generateFromPrefab(prefabPath, module, rootDir, defaultRequiredFiles, prefabDir, workingDir, name, buildaDir, websiteUrl, buildaReadmeFileName) {
    var _a, _b, _c, _d, _e, _f;
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
    const substitutions = (_b = (_a = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _a === void 0 ? void 0 : _a.substitutions) !== null && _b !== void 0 ? _b : [];
    (0, helpers_1.printMessage)(`Installed ${prefabName}@${version}`, 'success');
    (0, helpers_1.printMessage)('Creating export path...', 'processing');
    // Copy the prefab files to the export directory
    (0, helpers_1.copyDir)(prefabDir, workingDir);
    (0, helpers_1.printMessage)('Export path created', 'success');
    (0, helpers_1.printMessage)('Copying required files to application...', 'copying');
    // Copy all required files
    await (0, helpers_1.loopAndRewriteFiles)({
        name,
        paths: defaultRequiredFiles,
        substitute: [
            ...substitutions,
            {
                replace: '%APP_NAME%',
                with: (0, helpers_1.changeCase)(name, 'kebabCase')
            }
        ]
    });
    const buildaPath = node_path_1.default.join(workingDir, buildaDir);
    // Create a new package.json file in the root directory
    const packageJsonFile = node_fs_1.default.readFileSync(node_path_1.default.resolve(workingDir, 'package.json'), {
        encoding: 'utf8'
    });
    const packageJson = JSON.parse(packageJsonFile);
    const newPackageJson = Object.assign({}, packageJson);
    (_d = (_c = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _c === void 0 ? void 0 : _c.rootFiles) === null || _d === void 0 ? void 0 : _d.forEach(async (file) => {
        var _a;
        const filePath = typeof file === 'string' ? file : file.path;
        const fileDir = node_path_1.default.dirname(filePath);
        const fileName = node_path_1.default.basename(filePath);
        if (typeof file === 'string') {
            // If the file is just a string, copy that file to the root
            await (0, helpers_1.copyPathsToRoot)([file], rootDir);
        }
        else {
            // If the file is a RootFile object, copy the file to the root and rewrite it
            const substitute = (_a = file.substitutions) !== null && _a !== void 0 ? _a : [];
            await (0, helpers_1.loopAndRewriteFiles)({
                name,
                paths: [file.path],
                substitute,
                fromCustomPath: rootDir,
                toRoot: true
            });
        }
        // If the file name starts with 'unique.' it requires some processing
        if (fileName.startsWith('unique.')) {
            // Delete the copy in the export directory
            node_fs_1.default.unlinkSync(node_path_1.default.join(workingDir, fileDir, fileName));
            // Rename the copy to remove the 'unique.' prefix
            const newFileName = fileName.replace('unique.', '');
            (0, helpers_1.printMessage)(`Found unique file`, 'processing');
            node_fs_1.default.renameSync(node_path_1.default.join(rootDir, fileDir, fileName), node_path_1.default.join(rootDir, fileDir, newFileName));
            (0, helpers_1.printMessage)(`Renamed unique file to: ${newFileName}`, 'success');
            // Add the unique file to the `ignored` array in the builda config
            const existingBuildaConfig = packageJson.builda || {};
            const buildaConfig = Object.assign(Object.assign({}, existingBuildaConfig), { ignored: [
                    ...(existingBuildaConfig.ignored || []),
                    node_path_1.default.join(fileDir, newFileName)
                ] });
            newPackageJson.builda = buildaConfig;
        }
    });
    // Create any extraFolders in the application root
    (_f = (_e = module === null || module === void 0 ? void 0 : module.generatorOptions) === null || _e === void 0 ? void 0 : _e.extraFolders) === null || _f === void 0 ? void 0 : _f.forEach(async (folder) => {
        node_fs_1.default.mkdirSync(node_path_1.default.join(rootDir, folder), { recursive: true });
        // add a .gitkeep file to the folder
        node_fs_1.default.writeFileSync(node_path_1.default.join(rootDir, folder, '.gitkeep'), '');
    });
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
    // Create a new package.json file in the root directory with updated details
    newPackageJson.scripts = buildaScripts;
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
            (0, helpers_1.printMessage)(`Installing blueprint: "${blueprint}"`, 'processing');
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
    return module;
}
exports.generateFromPrefab = generateFromPrefab;
