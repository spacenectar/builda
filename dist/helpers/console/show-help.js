"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
const chalk_1 = __importDefault(require("chalk"));
const helpers_1 = require("../../helpers");
const inquirer_1 = __importDefault(require("inquirer"));
exports.default = (message, type) => {
    console.clear();
    (0, helpers_1.printLogo)();
    const ui = new inquirer_1.default.ui.BottomBar();
    const consoleWidth = process.stdout.columns;
    type = type || 'info';
    let colour = 'bgBlue';
    let icon = '\u0069';
    if (type === 'error') {
        colour = 'bgRed';
        icon = '✖';
    }
    if (type === 'success') {
        colour = 'bgGreen';
        icon = '✔';
    }
    if (type === 'warning') {
        colour = 'bgYellow';
        icon = '⚠';
    }
    if (type === 'builda') {
        colour = 'bgMagenta';
        icon = 'B̳';
    }
    // @ts-ignore-implicit-any - chalk typings are wrong
    const iconTag = '  ' + chalk_1.default.bold.white[colour](`  ${icon}  `);
    const paddingLine = '  ' +
        // @ts-ignore-implicit-any - chalk typings are wrong
        chalk_1.default[colour](' '.repeat(5)) +
        ' ' +
        // @ts-ignore-implicit-any - chalk typings are wrong
        chalk_1.default[colour](' '.repeat(consoleWidth - 10)) +
        '\n';
    const tag = paddingLine +
        iconTag +
        ' ' +
        // @ts-ignore-implicit-any - chalk typings are wrong
        chalk_1.default.bold.white[colour](`  ${type.toUpperCase()}${' '.repeat(consoleWidth - type.length - 12)}\n`) +
        paddingLine;
    // Create a horizontal line
    const line = chalk_1.default.white('─'.repeat(consoleWidth));
    // Find the last line break in the message and add a space after it
    const paddedMessage = message.replace(/\n/g, '\n  ');
    // If the message is longer than 20 characters before the console width, add a line break before the last whole word
    const wrappedMessage = paddedMessage.replace(new RegExp(`(.{${consoleWidth - 20}})(\\s|$)`, 'g'), '$1\n  ');
    ui.log.write(`\n${tag}\r\n  ${chalk_1.default.white(wrappedMessage)}\r\n\n${line}\r\n\n`);
};
