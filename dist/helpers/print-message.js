"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const printMessage = (message, type, returnstring) => {
    let newMessage = null;
    if (type && type === 'error') {
        newMessage = chalk_1.default.red(`🚨 ${message}`);
    }
    if (type && type === 'danger') {
        newMessage = chalk_1.default.red(`${message}`);
    }
    if (type && type === 'warning') {
        newMessage = chalk_1.default.yellow(`⚠️ ${message}`);
    }
    if (type && type === 'notice') {
        newMessage = chalk_1.default.blue(`📝 ${message}`);
    }
    if (type && type === 'success') {
        newMessage = chalk_1.default.green(`✅ ${message}`);
    }
    if (type && type === 'primary') {
        newMessage = chalk_1.default.magenta(`${message}`);
    }
    if (type && type === 'secondary') {
        newMessage = chalk_1.default.white(`${message}`);
    }
    if (!type) {
        newMessage = message;
    }
    return returnstring ? newMessage : console.log(`${newMessage}\n`);
};
exports.default = printMessage;
