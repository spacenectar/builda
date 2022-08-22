"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubstitutions = void 0;
const throw_error_1 = __importDefault(require("./throw-error"));
const getSubstitutions = (commandList, argv) => {
    var _a;
    const substitutions = [];
    if ((_a = commandList.substitute) === null || _a === void 0 ? void 0 : _a.length) {
        commandList.substitute.forEach((sub) => {
            var _a;
            const argString = (argv === null || argv === void 0 ? void 0 : argv[sub.replace]) || '';
            // No substitution was provided but the config requires one
            if (sub.required && !argString) {
                (0, throw_error_1.default)(`"--${sub.replace}" missing in arguments. This is required.\n`);
            }
            // User has not provided a substitution but the config has a default fallback value
            if (sub.with && !argString) {
                substitutions.push({
                    replace: sub.replace.toUpperCase(),
                    with: sub.with
                });
            }
            // User has provided the substitution argument
            if (argString) {
                const value = argString === true
                    ? ''
                    : argString;
                // User has provided the substitution argument with no value
                if (value === '') {
                    (0, throw_error_1.default)(`"--${sub.replace}" requires a value`);
                }
                if (sub.valid &&
                    value !== '' &&
                    !((_a = sub.valid) === null || _a === void 0 ? void 0 : _a.includes(value))) {
                    (0, throw_error_1.default)(`\n"${value}" is not a valid ${sub.replace}. Please use one of the following: \n - ${sub.valid.join(`\n - `)}\n`);
                }
                // The value provided is valid
                substitutions.push({
                    replace: sub.replace.toUpperCase(),
                    with: argString
                });
            }
        });
    }
    return substitutions;
};
exports.getSubstitutions = getSubstitutions;
exports.default = exports.getSubstitutions;
