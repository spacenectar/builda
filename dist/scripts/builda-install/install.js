"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
// Import globals
const globals_1 = __importDefault(require("../../data/globals"));
// Import scripts
const helpers_1 = require("../../helpers");
exports.default = async () => {
    // Install any builda modules defined in the config
    const config = (0, helpers_1.getConfig)();
    const { prefab, blueprints } = config;
    const { buildaDir } = globals_1.default;
    const outputPath = process.cwd();
    // Check the module directory exists and create it if it doesn't
    const moduleDirPath = node_path_1.default.join(outputPath, buildaDir, 'modules');
    if (!node_fs_1.default.existsSync(moduleDirPath)) {
        node_fs_1.default.mkdirSync(moduleDirPath, { recursive: true });
    }
    (0, helpers_1.printMessage)('Installing modules...', 'info');
    (0, helpers_1.printMessage)('Looking for prefab...', 'processing');
    if (prefab) {
        if (!node_fs_1.default.existsSync(node_path_1.default.join(moduleDirPath, 'prefab'))) {
            node_fs_1.default.mkdirSync(moduleDirPath, { recursive: true });
        }
        else {
            (0, helpers_1.throwError)('prefab directory already exists, aborting');
        }
        (0, helpers_1.printMessage)('Prefab found', 'success');
        if (!prefab.location) {
            (0, helpers_1.throwError)('No prefab location found');
        }
        if (prefab.location === 'prefab') {
            (0, helpers_1.throwError)('Prefab location cannot be "prefab". Please specify a specific location');
        }
        if (!prefab.version) {
            (0, helpers_1.printMessage)('No prefab version specified, using the location entry as full path to prefab', 'warning');
        }
        const basePath = prefab.version
            ? `${prefab.location}/v/${prefab.version}`
            : prefab.location;
        if ((0, helpers_1.detectPathType)(basePath) === 'remote') {
            const installPath = (0, helpers_1.convertRegistryPathToUrl)({
                registryPath: basePath
            }).url;
            await (0, helpers_1.addRemoteModule)(installPath);
        }
        else {
            await (0, helpers_1.addLocalModule)(basePath);
        }
        // Check the prefab was installed successfully
        const prefabPath = node_path_1.default.join(moduleDirPath, 'prefab');
        if (node_fs_1.default.existsSync(prefabPath)) {
            (0, helpers_1.printMessage)('Prefab installed successfully', 'success');
            (0, helpers_1.printMessage)('Creating export folder...', 'processing');
            const workingDir = node_path_1.default.join(outputPath, globals_1.default.buildaDir);
            const prefabRoot = node_path_1.default.join(workingDir, 'modules', 'prefab');
            const exportRoot = node_path_1.default.join(workingDir, 'export');
            // Create the export directory if it doesn't exist
            if (!node_fs_1.default.existsSync(exportRoot)) {
                node_fs_1.default.mkdirSync(exportRoot, { recursive: true });
                (0, helpers_1.copyPath)(prefabRoot, exportRoot);
                // Remove the builda directory from the export directory
                if (node_fs_1.default.existsSync(node_path_1.default.join(exportRoot, globals_1.default.buildaDir))) {
                    node_fs_1.default.rmSync(node_path_1.default.join(exportRoot, globals_1.default.buildaDir), {
                        force: true,
                        recursive: true
                    });
                }
                (0, helpers_1.printMessage)('Export folder created successfully', 'success');
            }
        }
        else {
            (0, helpers_1.throwError)('Prefab installation failed');
        }
    }
    else {
        (0, helpers_1.printMessage)('No prefab found, skipping...', 'info');
    }
    (0, helpers_1.printMessage)('Looking for blueprints...', 'processing');
    if (blueprints) {
        (0, helpers_1.printMessage)('Blueprints found', 'success');
        const blueprintsArray = Object.entries(blueprints);
        for (const [blueprintName, blueprint] of blueprintsArray) {
            if (!blueprint.version && blueprint.location !== 'prefab') {
                (0, helpers_1.printMessage)(`No version specified for ${blueprintName}, using location entry as full path to blueprint`, 'warning');
            }
            if (!blueprint.location) {
                (0, helpers_1.throwError)(`No blueprint path found for ${blueprintName}`);
            }
            if (!node_fs_1.default.existsSync(node_path_1.default.join(moduleDirPath, 'blueprints', blueprintName))) {
                node_fs_1.default.mkdirSync(moduleDirPath, { recursive: true });
            }
            else {
                (0, helpers_1.throwError)(`blueprint ${blueprintName} already exists, aborting`);
            }
            if (blueprint.location === 'prefab') {
                // Copy the 'blueprints' folder from the prefab to the .builda folder
                const blueprintSrc = node_path_1.default.join(moduleDirPath, 'prefab', '.builda', 'modules', 'blueprints', blueprintName);
                if (node_fs_1.default.existsSync(blueprintSrc)) {
                    (0, helpers_1.copyDir)(blueprintSrc, node_path_1.default.join(moduleDirPath, 'blueprints', blueprintName));
                }
                else {
                    (0, helpers_1.throwError)(`No blueprint found in prefab for ${blueprintName}`);
                }
            }
            else {
                const basePath = blueprint.version
                    ? `${blueprint.location}/v/${blueprint.version}`
                    : blueprint.location;
                if ((0, helpers_1.detectPathType)(basePath) === 'remote') {
                    const installPath = (0, helpers_1.convertRegistryPathToUrl)({
                        registryPath: basePath
                    }).url;
                    await (0, helpers_1.addRemoteModule)(installPath);
                }
                else {
                    await (0, helpers_1.addLocalModule)(basePath);
                }
            }
            // Check the blueprint was installed successfully
            if (node_fs_1.default.existsSync(node_path_1.default.join(moduleDirPath, 'blueprints', blueprintName))) {
                (0, helpers_1.printMessage)(`Blueprint ${blueprintName} installed successfully`, 'success');
            }
            else {
                (0, helpers_1.throwError)(`Blueprint ${blueprintName} installation failed`);
            }
        }
    }
    else {
        (0, helpers_1.printMessage)('No blueprints found, skipping...', 'info');
    }
};
