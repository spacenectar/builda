"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubstitutions = void 0;
const helpers_1 = require("../../helpers");
const getSubstitutions = ({ name, registry, script }) => {
    var _a, _b;
    const substitutions = [];
    const substitute = (script === null || script === void 0 ? void 0 : script.substitute) && ((_a = script.substitute) === null || _a === void 0 ? void 0 : _a.length) > 0
        ? script === null || script === void 0 ? void 0 : script.substitute
        : (_b = registry === null || registry === void 0 ? void 0 : registry.generatorOptions) === null || _b === void 0 ? void 0 : _b.substitutions;
    if (substitute && substitute.length) {
        substitute.forEach((sub) => {
            var _a;
            const defaultString = sub.with === 'script' ? name : sub.with;
            const replaceString = (sub === null || sub === void 0 ? void 0 : sub.replace) || sub.replace;
            const subtring = sub === null || sub === void 0 ? void 0 : sub.with;
            const withString = subtring || defaultString || '';
            // No substitution was provided but the config requires one
            if (!defaultString && !replaceString && sub.required) {
                (0, helpers_1.throwError)(`"--${sub.replace}" missing in arguments. This is required.\n`);
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
                    (0, helpers_1.throwError)(`"--${sub.replace}" requires a value`);
                }
                if (sub.valid &&
                    withString !== '' &&
                    !((_a = sub.valid) === null || _a === void 0 ? void 0 : _a.includes(withString))) {
                    (0, helpers_1.throwError)(`\n"${withString}" is not a valid ${sub.replace}. Please use one of the following: \n - ${sub.valid.join(`\n - `)}\n`);
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
