export interface LegacyConfig {
  /** This is only being used to migrate so I'm not doing line by line comments here */
  output: string;
  typescript?:
    | {
        inline: boolean | undefined;
      }
    | false
    | undefined;
  storybook?:
    | {
        use_mdx: boolean | undefined;
        params: string | string[] | undefined;
      }
    | false
    | undefined;
  tests?:
    | {
        extension: 'spec' | 'test' | undefined;
      }
    | false
    | undefined;
  styles?:
    | {
        preprocessor: 'scss' | 'sass' | false;
        modules: boolean;
      }
    | false
    | undefined;
  generate_readme: boolean | undefined;
  directories: boolean | undefined;
  prepopulate: boolean | undefined;
}
