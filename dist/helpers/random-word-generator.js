"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const words_json_1 = require("../data/words.json");
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const randomWordGenerator = () => {
    const adjective = words_json_1.adjectives[Math.floor(Math.random() * words_json_1.adjectives.length)];
    const noun = words_json_1.nouns[Math.floor(Math.random() * words_json_1.nouns.length)];
    return `${capitalize(adjective)}${capitalize(noun)}`;
};
exports.default = randomWordGenerator;
