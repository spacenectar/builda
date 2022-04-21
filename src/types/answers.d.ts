export interface Answers {
  componentName: string;
  outputDirectory: string;
  useTS: boolean;
  createTypesFolder: boolean;
  createStyleSheet: boolean;
  useModules: boolean;
  chooseStyleSheet: string;
  createStories: boolean;
  chooseStorybook: string;
  createSpec: boolean;
  createDirectories: string;
  createReadme: boolean;
  prepopulate: boolean;
  // TODO: The types from the config file do not exist here
  // It's still a bit nuts and I think it's worth making the effort to unify
  // the output of the config file and the CLI.
}
