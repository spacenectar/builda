"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const get_site_link_1 = __importDefault(require("./get-site-link"));
exports.default = ({ link, anchor, endText }) => {
    endText = endText || 'for more information.';
    return ('\n\nSee ' + chalk_1.default.blue.underline((0, get_site_link_1.default)(link, anchor)) + ' ' + endText);
};
