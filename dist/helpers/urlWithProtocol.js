"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlWithProtocol = void 0;
const urlWithProtocol = (url) => {
    // If a url starts with http or https, return the url unchanged
    if (url.startsWith('http') || url.startsWith('https')) {
        return url;
    }
    return `https://${url}`;
};
exports.urlWithProtocol = urlWithProtocol;
