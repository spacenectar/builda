const comments = {
  output:
    '# The folder the components will be generated in. This is relative to the buildcomrc file.',
  typescript:
    '# Use TypeScript instead of JavaScript? Set to false or omit to disable.',
  inline:
    '# Where should the Prop Types be generated? Inline or separate file?',
  storybook:
    '# Generate storybook stories for each component. Set to false or omit to disable.',
  story_format: '# What format should the storybook use? Set to "mdx" or "csf"',
  params:
    '# Add parameters to the generated stories (one per line) (see https://storybook.js.org/docs/react/writing-stories/parameters#story-parameters for more info).',
  namespace:
    '# Add a namespace to the stories (This is better to do manually each time unless you have a single namespace for all components).',
  tests:
    '# Generate tests for each component. (Only Jest is supported at the moment.) Set to false or omit to disable.',
  extension:
    '# Filename format for test files can be either "spec" or "test", outputs as index.[choice].[ext], where [ext] is based on your answer to "use_typescript".',
  styles:
    '# Generate a stylesheet for each component. Set to false or omit to disable.',
  preprocessor:
    '# Use preprocessor for stylesheets? (can be "sass", "scss" or false)',
  modules: '# Use CSS modules?',
  generate_readme:
    '# Generate a README.md file for each component (recommended unless using MDX for storybook stories).',
  extra_directories:
    '# Generate additional directories for each component (e.g. "images", "helpers", "mocks") (one per line).',
  prepopulate:
    '# If true, example code will be added to the component files. If false, the files will be empty.'
};

const configContents = (config: string) => {
  const lines = config.split('\n');

  const newLines = lines.map((line) => {
    const key = line.split(':')[0].trim();
    if (key.charAt(0) === '-') {
      return line;
    }
    /* @ts-ignore -- Don't know what is causing this - will debug later*/
    if (comments[key]) {
      /* @ts-ignore */
      return `  ${comments[key]}\n  ${line}`;
    }
    return line;
  });

  const firstLine = `# Builda config. See [url goes here] for instructions.\\n`;

  return `${firstLine}${newLines.join('\n')}`;
};

export default configContents;
