"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.indexer = void 0;
const indexer_1 = __importDefault(require("./indexer"));
exports.indexer = indexer_1.default;
const command_1 = __importDefault(require("./command"));
exports.command = command_1.default;
