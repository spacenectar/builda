"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfigFromArguments = (argv) => {
    const typescript = argv.typescript
        ? {
            inline: true
        }
        : false;
    const storybook = argv.storybook
        ? {
            story_format: argv.story_format,
            params: undefined,
            namespace: undefined
        }
        : false;
    const tests = argv.tests
        ? {
            extension: argv.text_extension
        }
        : false;
    const styles = argv.css
        ? {
            preprocessor: argv.css === 'css' ? false : argv.css,
            modules: argv.modules
        }
        : false;
    return {
        component_names: argv._,
        output: argv.output,
        typescript,
        storybook,
        tests,
        styles,
        generate_readme: argv.readme,
        prepopulate: argv.prepopulate,
        extra_directories: argv.dirs,
        force: argv.force
    };
};
exports.default = getConfigFromArguments;