export interface Config {
  /**
   * The name of the component
   */
  component_name?: string;
  /**
   * The output directory (relative buildcomrc file)
   */
  output: string;
  /**
   * Generate storybook files?
   * @default false
   */
  storybook?:
    | {
        /**
         * The parameters to add to the storybook file
         */
        params: string | string[] | undefined;
        /**
         * Use MDX format for stories? Will generate CSF files if false
         * @default csf
         */
        story_format: 'mdx' | 'csf';
        /**
         * Do you want to add a namespace to each component's story?
         * @default false
         */
        namespace: string | false;
      }
    | false;
  /**
   * Generate test files?
   * @default false
   */
  tests?:
    | {
        /**
         * The extension of the test file (one of 'spec' or 'test')
         */
        extension: 'spec' | 'test';
      }
    | false;
  /**
   * Generate Stylesheet files?
   * @default false
   */
  styles?:
    | {
        /**
         * The preprocessor to use (one of 'sass', 'scss', 'less', 'stylus')
         * This will soon be deprecated in favor of the 'scss' option
         * @default false
         */
        preprocessor?: 'scss' | 'sass' | false;
        /**
         * Use CSS modules? (aslo works with preprocessors)
         * @default false
         */
        modules?: boolean;
      }
    | false;
  /**
   * Generate TypeScript files?
   * @default false
   */
  typescript?:
    | {
        /**
         * Output type definitions in a the same file as the component?
         * False will output them in a separate file in the 'types' directory
         * @default false
         */
        inline: boolean;
      }
    | false;
  /**
   * Generate a README file? (Recommended for CSF Storybook, but kind of redundant for MDX)
   * @default false
   */
  generate_readme?: boolean;
  /**
   * Any additional directories to generate
   * @default []
   */
  extra_directories?: string[];
  /**
   * Prepopulate the component with example code?
   * @default false
   */
  prepopulate?: boolean;
  /**
   * Force component to be generated even if it already exists? (use with caution)
   * @default false
   */
  force?: boolean;
}
