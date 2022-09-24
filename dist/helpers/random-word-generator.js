"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const words_json_1 = require("../data/words.json");
const randomNameGenerator = () => {
    const adjective = words_json_1.adjectives[Math.floor(Math.random() * words_json_1.adjectives.length)];
    const noun = words_json_1.nouns[Math.floor(Math.random() * words_json_1.nouns.length)];
    return `${adjective.toLowerCase()}-${noun.toLowerCase()}`;
};
exports.default = randomNameGenerator;
