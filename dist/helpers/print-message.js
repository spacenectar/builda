"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const printMessage = (message, type) => {
    let newMessage = null;
    if (type && type === 'error') {
        newMessage = chalk_1.default.keyword('red')(`🚨 ${message}`);
    }
    if (type && type === 'warning') {
        newMessage = chalk_1.default.keyword('orange')(`⚠️  ${message}`);
    }
    if (type && type === 'notice') {
        newMessage = chalk_1.default.keyword('blue')(message);
    }
    if (type && type === 'success') {
        newMessage = chalk_1.default.keyword('green')(`${message}`);
    }
    if (type && type === 'primary') {
        newMessage = chalk_1.default.keyword('magenta')(`${message}`);
    }
    if (!type) {
        newMessage = message;
    }
    return console.log(newMessage);
};
exports.default = printMessage;
