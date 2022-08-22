"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubstitutions = void 0;
const throw_error_1 = __importDefault(require("./throw-error"));
const getSubstitutions = ({ registry, command, args }) => {
    const substitutions = [];
    const substitute = ((command === null || command === void 0 ? void 0 : command.substitute) && command.substitute.length > 0) ? command === null || command === void 0 ? void 0 : command.substitute : registry === null || registry === void 0 ? void 0 : registry.substitute;
    if (substitute && substitute.length) {
        substitute.forEach((sub) => {
            var _a;
            const defaultString = sub.with === 'command' ? command === null || command === void 0 ? void 0 : command.name : sub.with;
            const replaceString = (args === null || args === void 0 ? void 0 : args.replace) || sub.replace;
            const argString = args === null || args === void 0 ? void 0 : args.with;
            const withString = argString || defaultString || '';
            // No substitution was provided but the config requires one
            if (!defaultString && !replaceString && sub.required) {
                (0, throw_error_1.default)(`"--${sub.replace}" missing in arguments. This is required.\n`);
            }
            // User has not provided a substitution but the config has a default fallback value
            if (withString && !replaceString) {
                substitutions.push({
                    replace: replaceString.toUpperCase(),
                    with: withString
                });
            }
            // User has provided the substitution argument
            if (replaceString) {
                // User has provided the substitution argument with no value
                if (withString === '') {
                    (0, throw_error_1.default)(`"--${sub.replace}" requires a value`);
                }
                if (sub.valid &&
                    withString !== '' &&
                    !((_a = sub.valid) === null || _a === void 0 ? void 0 : _a.includes(withString))) {
                    (0, throw_error_1.default)(`\n"${withString}" is not a valid ${sub.replace}. Please use one of the following: \n - ${sub.valid.join(`\n - `)}\n`);
                }
                // The value provided is valid
                substitutions.push({
                    replace: sub.replace.toUpperCase(),
                    with: withString
                });
            }
        });
    }
    return substitutions;
};
exports.getSubstitutions = getSubstitutions;
exports.default = exports.getSubstitutions;
