"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateModulePath = void 0;
const axios_1 = __importDefault(require("axios"));
function validateModulePath(input, answers) {
    const registryUrl = new URL(input);
    return axios_1.default
        .get(registryUrl.href)
        .then((response) => {
        if (response.data) {
            answers.prefabRegistry = response.data;
            return true;
        }
        return 'The url must point to a folder that contains a registry.json file';
    })
        .catch((error) => {
        error.code === 'ENOTFOUND' &&
            console.log('The url must point to a folder that contains a registry.json file');
        error.response.status === 404 &&
            console.log('The url must point to a folder that contains a registry.json file');
        error.response.status === 403 &&
            console.log('You do not have permission to access the url');
        error.response.status === 500 &&
            console.log('The url you entered returned an internal server error');
        error.response.status === 502 &&
            console.log('The url you entered returned a bad gateway error');
        error.response.status === 503 &&
            console.log('The url you entered returned a service unavailable error');
        error.response.status === 504 &&
            console.log('The url you entered returned a gateway timeout error');
        return 'An unknown error occurred';
    });
}
exports.validateModulePath = validateModulePath;
