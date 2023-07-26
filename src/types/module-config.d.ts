type ModuleConfigContents = {
  /**
   * The version of the module (not required for blueprints preinstalled inside a prefab)
   */
  version?: string;
  /**
   * The custom resolver to use for the module
   **/
  resolve?: string | { url: string; type: string };
  /**
   * The location of the module. This can be a local path, a remote url, a resolver or 'prefab' (if preinstalled inside a prefab)
   */
  location: string;
  /**
   * If the module should have a custom output directory, specify it here (relative to the app_root)
   */
  outputDir?: string;
};

type ModuleConfig = {
  [key: string]: ModuleConfigContents;
};
