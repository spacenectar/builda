"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswers = void 0;
const _helpers_1 = require("../../../helpers/index.js");
const questions_1 = __importDefault(require("./questions"));
const getAnswers = async (omitName, omitPathName, omitYarnOrNpm) => {
    return new Promise((resolve) => {
        const questionList = questions_1.default.filter((question) => {
            if (omitName && question.name === 'appName') {
                return false;
            }
            if (omitPathName && question.name === 'pathName') {
                return false;
            }
            if (omitYarnOrNpm && question.name === 'yarnOrNpm') {
                return false;
            }
            return true;
        });
        (0, _helpers_1.askQuestion)({
            questionList
        }).then((answers) => {
            return resolve(answers);
        });
    });
};
exports.getAnswers = getAnswers;
