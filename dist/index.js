#! /usr/bin/env node
"use strict";
// import returnMessage from './helpers/return-message';
// import comGen from '@scripts/component-generator';
// import getConfig from '@scripts/get-config';
// import { Config } from '@typedefs/config';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// returnMessage('\n=============================================', 'primary');
// returnMessage('BuildCom_\r', 'primary');
// returnMessage(`Component builder`, 'primary');
// returnMessage('=============================================\n', 'primary');
// // Generate the component
// getConfig().then((configs) =>
//   configs.forEach((config: Config) => comGen(config))
// );
const config_1 = __importDefault(require("./scripts/config"));
(0, config_1.default)();
