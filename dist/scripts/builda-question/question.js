"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
/**
 * Asks the user a series of questions, defined by the prefab,
 * @param { TQuestion }
 */
exports.default = async ({ questions }) => {
    return inquirer_1.default.prompt(questions);
};
