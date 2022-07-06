"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const makeStoryParams = (mdx, readme, params) => {
    const storyParamsString = params ? params.join(', ') : '';
    if (storyParamsString) {
        if (mdx) {
            return `parameters={{ ${storyParamsString} }}`;
        }
        return `parameters: {
          ${storyParamsString},
          ${readme &&
            `readme: {
            // Show readme before story
            content: docs
          }`}
        }`;
    }
    return '';
};
exports.default = makeStoryParams;
