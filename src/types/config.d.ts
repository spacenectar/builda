export interface Config {
  /**
   * The name of the component
   */
  name: string;
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
        params: string;
        /**
         * Use MDX format for stories? Will generate CSF files if false
         * @default false
         */
        mdx: boolean;
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
         * @default 'css'
         */
        preprocessor?: string | false;
        /**
         * Use SCSS as the preprocessor? (if 'true' will use 'scss' but you can also specify 'sass')
         * @default false
         */
        scss?: boolean | 'scss' | 'sass';
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
  readme?: boolean;
  /**
   * Any additional directories to generate
   * @default []
   */
  directories?: string[];
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
