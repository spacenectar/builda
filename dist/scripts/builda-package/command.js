"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = __importDefault(require("./package"));
exports.default = () => {
    return {
        command: 'package',
        desc: 'Package a module ready for publishing',
        aliases: ['package', 'pack'],
        handler: async () => {
            return (0, package_1.default)();
        }
    };
};
