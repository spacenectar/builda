"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubstitutions = void 0;
const throw_error_1 = __importDefault(require("./throw-error"));
const getSubstitutions = (commandList, argv) => {
    const substitutions = [];
    if (commandList.substitute) {
        commandList.substitute.forEach((sub) => {
            var _a;
            // No substitution was provided but the config requires one
            if (sub.required && !argv[sub.string]) {
                (0, throw_error_1.default)(`"--${sub.string}" missing in arguments. This is required.\n`);
            }
            // User has not provided a substitution but the config has a default fallback value
            if (sub.default && !argv[sub.string]) {
                substitutions.push({
                    replace: sub.string.toUpperCase(),
                    with: sub.default
                });
            }
            // User has provided the substitution argument
            if (argv[sub.string]) {
                const value = argv[sub.string] === true
                    ? ''
                    : argv[sub.string];
                // User has provided the substitution argument with no value
                if (value === '') {
                    (0, throw_error_1.default)(`"--${sub.string}" requires a value`);
                }
                if (sub.valid &&
                    value !== '' &&
                    !((_a = sub.valid) === null || _a === void 0 ? void 0 : _a.includes(value))) {
                    (0, throw_error_1.default)(`\n"${value}" is not a valid ${sub.string}. Please use one of the following: \n - ${sub.valid.join(`\n - `)}\n`);
                }
                // The value provided is valid
                substitutions.push({
                    replace: sub.string.toUpperCase(),
                    with: argv[sub.string]
                });
            }
        });
    }
    return substitutions;
};
exports.getSubstitutions = getSubstitutions;
exports.default = exports.getSubstitutions;
