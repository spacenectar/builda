"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
/**
 * Ask exactly one question to the user (saves boilerplating inquirer out each time)
 */
const askQuestion = ({ message, type, name, defaultValue, questionList, validate }) => {
    if (questionList) {
        return inquirer_1.default.prompt(questionList);
    }
    if (!message || !name) {
        throw new Error('Missing required arguments. Name and message are required.');
    }
    return inquirer_1.default.prompt({
        type: type || 'input',
        name,
        message,
        default: defaultValue,
        validate
    });
};
exports.default = askQuestion;
