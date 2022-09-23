"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
exports.default = (message, type) => {
    const ui = new inquirer_1.default.ui.BottomBar();
    let tag = chalk_1.default.bold.white.bgBlue('   INFO   ');
    if (type === 'error') {
        tag = chalk_1.default.bold.white.bgRed('   ERROR   ');
    }
    if (type === 'success') {
        tag = chalk_1.default.bold.white.bgGreen('   SUCCESS   ');
    }
    if (type === 'warning') {
        tag = chalk_1.default.bold.white.bgYellow('   WARNING   ');
    }
    ui.log.write(`\n${tag}\n\n${chalk_1.default.white(message)}\n\n`);
};
