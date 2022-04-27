"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const print_message_1 = __importDefault(require("./print-message"));
exports.default = (message) => {
    (0, print_message_1.default)(message, 'error');
    return process.exit(1);
};
