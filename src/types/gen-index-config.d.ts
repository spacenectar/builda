type GenIndexConfig = {
  /**
   * The directories to generate indexes for
   * Add an * to the end to work with subdirectories
   * (make sure you don't add it if you don't want to include subdirectories
   * or you'll get 'interesting' results)
   */
  directories: string[];
  /**
   * The extension of the index files
   * @default 'ts'
   */
  indexExt?: string;
};
