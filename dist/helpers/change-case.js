"use strict";
// TODO: If would be good if no matter what the type is, the output would always be the same
// e.g. 'my-component', 'MyComponent', 'My Component' or 'my_component' would all output as
// 'my-component if the type is kebab, but 'MyComponent' if the type is pascal, etc.
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = (input, type) => {
    const str = input
        .replace(/[,_]/g, ' ')
        .replace(/&/g, ' and ')
        .replace(/@/g, ' at ')
        .replace(/\s+/g, '-')
        .trim();
    let output = '';
    if (type === 'sentenceCase') {
        output = str.replace(/\w\S*/g, (txt) => {
            return (txt.charAt(0).toUpperCase() +
                txt.substring(1).toLowerCase().replace(/-/g, ' ').replace(/_/g, ' '));
        });
    }
    else if (type === 'kebabCase') {
        output = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
    else if (type === 'pascalCase') {
        output = str
            .split('-')
            .map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
            .join('');
    }
    else if (type === 'camelCase') {
        output = str
            .split('-')
            .map((word, index) => {
            return index === 0
                ? word.charAt(0).toLowerCase() + word.slice(1)
                : word.charAt(0).toUpperCase() + word.slice(1);
        })
            .join('');
    }
    else if (type === 'snakeCase') {
        output = str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }
    else {
        output = str;
    }
    return output;
};
exports.default = changeCase;
