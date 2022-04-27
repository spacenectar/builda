import yargs from 'yargs';

import arguments from '@data/arguments.json';

// TODO: Add option to allow for multiple components to be created at once

const getConfigFromArguments = async (args: readonly string[]) => {
  const parser = yargs(args)
    .usage('Usage: $0 [options]')
    .options(arguments as { [key: string]: yargs.Options })
    .help('h')
    .version()
    .alias('h', 'help');

  const argv = await parser.argv;

  const typescript = argv.typescript
    ? {
        inline: true
      }
    : false;

  const storybook = argv.storybook
    ? {
        use_mdx: argv.mdx,
        params: undefined
      }
    : false;

  const tests = argv.tests
    ? {
        extension: argv.text_extension
      }
    : false;

  const styles = argv.css
    ? {
        use_scss: argv.css,
        modules: argv.modules
      }
    : false;

  const config = {
    component_name: argv.name,
    output: argv.output,
    typescript,
    storybook,
    tests,
    styles,
    generate_readme: argv.readme,
    prepopulate: argv.prepopulate,
    directories: argv.dirs,
    force: argv.force
  };

  return config;
};

export default getConfigFromArguments;
