#! /usr/bin/env node
import inquirer from 'inquirer';

/**
 * Asks the user a series of questions, defined by the prefab
 */
declare const _default$2: (questions: inquirer.QuestionCollection<any>) => Promise<any>;

/**
 * Substitute values found in all files in the rootFiles and applicationOnlyFiles arrays
 * (This is a post-processing step and exists to give prefab developers more control over the final output)
 */
declare const _default$1: (substitutions: TSubstitution[]) => Promise<void>;

declare type Types = 'error' | 'danger' | 'warning' | 'copying' | 'config' | 'downloading' | 'installing' | 'notice' | 'info' | 'success' | 'watch' | 'build' | 'run' | 'processing' | 'primary' | 'secondary' | 'confirm';
declare const printMessage: (message: string, type: Types, returnstring?: boolean) => string | boolean | null;

declare const _default: (message: string) => never;

declare const changeCase: (input: string, type: string) => string;

declare const builda: () => Promise<{
    [x: string]: unknown;
    configPath: string;
    _: (string | number)[];
    $0: string;
} | {
    [x: string]: unknown;
    configPath: string;
    _: (string | number)[];
    $0: string;
}>;

export { builda, _default$2 as buildaQuestion, _default$1 as buildaSubstitute, changeCase, builda as default, printMessage, _default as throwError };
