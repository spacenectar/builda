"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
exports.default = async () => {
    const packageJson = () => {
        try {
            const packageJson = JSON.parse(node_fs_1.default.readFileSync('package.json', 'utf8'));
            return packageJson;
        }
        catch (error) {
            return '';
        }
    };
    const { name } = packageJson();
    // Find out if the project is a monorepo
    const checkForMonorepo = () => {
        if (node_fs_1.default.existsSync('lerna.json')) {
            return true;
        }
        if (packageJson().workspaces) {
            return true;
        }
        return false;
    };
    const isMonorepo = checkForMonorepo();
    const determinePackageManager = () => {
        if (node_fs_1.default.existsSync('yarn.lock')) {
            return 'yarn';
        }
        if (node_fs_1.default.existsSync('package-lock.json')) {
            return 'npm';
        }
        return 'unknown';
    };
    const packageManager = determinePackageManager();
    return inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: `We think your project is called ${chalk_1.default.bold.magenta(name)}. Press enter if correct? If not, enter the correct name here.`,
            default: name
        },
        {
            type: 'input',
            name: 'appRoot',
            message: () => {
                (0, helpers_1.showHelp)("The app root is the directory where your app files are stored.\n\nThis is usually your current working directory but if you are using a monorepo or if you'd like to store your app files in a different directory, you can specify it here it here.\n\nIf you're not sure, just press enter to use the current working directory.");
                return `We think your app root ${!isMonorepo
                    ? 'is ./'
                    : 'may be in a monorepo, please enter the package name. If it is not a monorepo, just press enter to use ./ or specify the directory your app is store in'}`;
            },
            default: './'
        },
        {
            type: 'list',
            name: 'packageManager',
            message: () => {
                (0, helpers_1.showHelp)('Builda works with both npm and yarn. If you are using a different package manager, unfortunately, Builda may not work for you.');
                return ('We think you are using ' +
                    chalk_1.default.bold.magenta(packageManager) +
                    '. Press enter if correct? If not, select the correct package manager.');
            },
            choices: ['npm', 'yarn'],
            default: packageManager
        }
    ]);
};
