"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const string_1 = require("helpers/string");
exports.default = ({ link, anchor, endText }) => {
    endText = endText || 'for more information.';
    return ('\n\nSee ' + chalk_1.default.blue.underline((0, string_1.getSiteLink)(link, anchor)) + ' ' + endText);
};
