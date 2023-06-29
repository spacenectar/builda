"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.buildaProject = void 0;
const configure_1 = __importDefault(require("./configure"));
exports.buildaProject = configure_1.default;
const command_1 = __importDefault(require("./command"));
exports.command = command_1.default;
