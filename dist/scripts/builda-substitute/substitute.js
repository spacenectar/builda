"use strict";
// import fs from 'node:fs';
// import path from 'node:path';
// import process from 'node:process';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Substitute values found in all files in the export directory
 * and the root files (if specified)
 */
exports.default = async (substitutions) => {
    substitutions.forEach((substitution) => {
        console.log(`Substituting ${substitution.replace} for ${substitution.with} in ${substitution.includeRootFiles ? 'included root files and ' : ''}export files`);
    });
};
