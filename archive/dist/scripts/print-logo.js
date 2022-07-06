"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const _helpers_1 = require("../helpers/index.js");
exports.default = () => {
    return console.log(chalk_1.default.magenta(`\n  █████████████████████████████████████████████████ ${chalk_1.default.white(`v${_helpers_1.globals.version}\n`)}
  ████████▄  ███    ███ ███ ███      ████████▄   ▄████████
  ███    ███ ███    ███ ███ ███      ███   ▀███ ███▀   ███
  ███    ███ ███    ███ ███ ███      ███    ███ ███    ███
  ███▄▄▄██▀  ███    ███ ███ ███      ███    ███ ███    ███
  ███▀▀▀██▄  ███    ███ ███ ███      ███    ███ ██████████
  ███    ██▄ ███    ███ ███ ███      ███    ███ ███    ███
  ███    ███ ███    ███ ███ ███      ███   ▄███ ███    ███
  ████████▀   ▀██████▀  ███ ████████ ████████▀  ███    ███ ██████\n
  ${chalk_1.default.white.bold('Component generator')} ███████████████████████████████████████████\n`));
};
