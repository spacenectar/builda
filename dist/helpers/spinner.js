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
const spinner = () => {
    process_1.default.stdout.write('\x1B[?25l');
    const spin = spinners.dots;
    const spinnerFrames = spin.frames;
    const spinnerTimeInterval = spin.interval;
    let index = 0;
    setInterval(() => {
        let now = spinnerFrames[index];
        if (now == undefined) {
            index = 0;
            now = spinnerFrames[index];
        }
        std.write(now);
        readline_1.default.cursorTo(std, 0, 0);
        index = index >= spinnerFrames.length ? 0 : index + 1;
    }, spinnerTimeInterval);
};
exports.spinner = spinner;
//TODO: Cursor position is not working properly and we need to be able to stop the spinner when we want to
exports.default = exports.spinner;
