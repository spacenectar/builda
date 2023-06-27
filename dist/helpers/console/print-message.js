"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const process_1 = __importDefault(require("process"));
const readline_1 = __importDefault(require("readline"));
const dots = {
    interval: 80,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
};
const stdOut = process_1.default.stdout;
const stderr = process_1.default.stderr;
let timer = undefined;
const printMessage = (message, type, returnstring) => {
    let newMessage = null;
    if (type && type === 'error') {
        if (timer !== undefined) {
            clearInterval(timer);
        }
        newMessage = chalk_1.default.red(`🚨 ${message}`);
    }
    if (type && type === 'danger') {
        newMessage = chalk_1.default.red(`${message}`);
    }
    if (type && type === 'warning') {
        newMessage = chalk_1.default.yellow(`🔔 ${message}`);
    }
    if (type && type === 'config') {
        newMessage = chalk_1.default.blue(`🔧 ${message}`);
    }
    if (type && type === 'downloading') {
        newMessage = chalk_1.default.blue(`🌍 ${message}`);
    }
    if (type && type === 'copying') {
        newMessage = chalk_1.default.blue(`📂 ${message}`);
    }
    if (type && type === 'installing') {
        newMessage = chalk_1.default.blue(`📦 ${message}`);
    }
    if (type && type === 'notice') {
        newMessage = chalk_1.default.blue(`📝 ${message}`);
    }
    if (type && type === 'info') {
        newMessage =
            chalk_1.default.bgHex('#6699CC').white.bold(' \u0069 ') +
                ' ' +
                chalk_1.default.reset.blue(message);
    }
    if (type && type === 'success') {
        if (timer !== undefined) {
            clearInterval(timer);
        }
        newMessage = chalk_1.default.green(`✅ ${message}`);
    }
    if (type && type === 'watch') {
        newMessage = chalk_1.default.magenta(`👀 ${message}`);
    }
    if (type && type === 'build') {
        newMessage = chalk_1.default.magenta(`🏗 ${message}`);
    }
    if (type && type === 'run') {
        newMessage = chalk_1.default.magenta(`🏃 ${message}`);
    }
    if (type && type === 'primary') {
        newMessage = chalk_1.default.magenta(`${message}`);
    }
    if (type && type === 'secondary') {
        newMessage = chalk_1.default.white(`${message}`);
    }
    if (type && type === 'processing') {
        // Create a spinner
        const spin = dots;
        const spinnerFrames = spin.frames;
        const spinnerTimeInterval = spin.interval;
        let index = 0;
        if (timer !== undefined) {
            clearInterval(timer);
        }
        timer = setInterval(() => {
            let now = spinnerFrames[index];
            if (now == undefined) {
                index = 0;
                now = spinnerFrames[index];
            }
            readline_1.default.clearLine(stdOut, 0);
            readline_1.default.cursorTo(stdOut, 0);
            stdOut.write(now);
            index = index >= spinnerFrames.length ? 0 : index + 1;
        }, spinnerTimeInterval);
        newMessage = chalk_1.default.blue(`${message}`);
    }
    if (!type) {
        newMessage = message;
    }
    const returnType = type === 'error' ? stderr : stdOut;
    return returnstring ? newMessage : returnType.write(`${newMessage}\n`);
};
exports.default = printMessage;
