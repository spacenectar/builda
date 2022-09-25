"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const globals_1 = __importDefault(require("data/globals"));
exports.default = () => {
    return console.log(chalk_1.default.magenta(`\n  █████████████████████████████████████████████████ ${chalk_1.default.white(`v${globals_1.default.version}\n`)}
  ████████▄  ███    ███ ███ ███      ████████▄   ▄████████
  ███    ███ ███    ███ ███ ███      ███   ▀███ ███▀   ███
  ███    ███ ███    ███ ███ ███      ███    ███ ███    ███
  ███▄▄▄██▀  ███    ███ ███ ███      ███    ███ ███    ███
  ███▀▀▀██▄  ███    ███ ███ ███      ███    ███ ██████████
  ███    ██▄ ███    ███ ███ ███      ███    ███ ███    ███
  ███    ███ ███    ███ ███ ███      ███   ▄███ ███    ███
  ████████▀   ▀██████▀  ███ ████████ ████████▀  ███    ███ ██████\n
  ${chalk_1.default.white.bold('The Everything Generator')} ██████████████████████████████████████\n`));
};
