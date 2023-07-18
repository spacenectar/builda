"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirm = void 0;
const chalk_1 = __importDefault(require("chalk"));
const process_1 = __importDefault(require("process"));
const readline_1 = __importDefault(require("readline"));
// Adds a confirm prompt with a custom message and
// returns a promise that resolves to a boolean
const confirm = (message) => {
    return new Promise((resolve) => {
        const rl = readline_1.default.createInterface({
            input: process_1.default.stdin,
            output: process_1.default.stdout
        });
        rl.question(chalk_1.default.blue(`🤔 ${message} [y/N] `), (answer) => {
            answer = answer.toLowerCase();
            rl.close();
            if (answer === 'y') {
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    });
};
exports.confirm = confirm;
exports.default = exports.confirm;
