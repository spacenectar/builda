export type ModuleConfigContents = {
  /**
   * The version of the module (not required for blueprints preinstalled inside a prefab)
   */
  version?: string;
  /**
   * The custom resolver to use for the module
   **/
  resolve?: string;
  /**
   * The location of the module. This can be a local path, a remote url, a resolver or 'prefab' (if preinstalled inside a prefab)
   */
  location: string;
  /**
   * If the module should have a custom output directory, specify it here (relative to the app_root)
   */
  output_dir?: string;
};

export type ModuleConfig = {
  [key: string]: ModuleConfigContents;
};

export default ModuleConfig;
