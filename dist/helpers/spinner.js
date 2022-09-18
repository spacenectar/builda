"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinner = void 0;
const process_1 = __importDefault(require("process"));
const readline_1 = __importDefault(require("readline"));
const std = process_1.default.stdout;
const spinners = {
    dots: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    }
};
const spinner = ({ mode }) => {
    process_1.default.stdout.write('\x1B[?25l');
    const spin = spinners.dots;
    const spinnerFrames = spin.frames;
    const spinnerTimeInterval = spin.interval;
    let index = 0;
    let timer;
    if (mode === 'start') {
        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(() => {
            let now = spinnerFrames[index];
            if (now == undefined) {
                index = 0;
                now = spinnerFrames[index];
            }
            readline_1.default.clearLine(std, 0);
            readline_1.default.cursorTo(std, 0);
            std.write(now);
            index = index >= spinnerFrames.length ? 0 : index + 1;
        }, spinnerTimeInterval);
    }
    if (mode === 'stop') {
        clearInterval(timer);
        readline_1.default.clearLine(std, 0);
    }
};
exports.spinner = spinner;
exports.default = exports.spinner;
