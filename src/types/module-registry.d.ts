import TSubstitution from './substitution';
import ModuleConfig from './module-config';

export type RootFile = {
  /**
   * The path to the root file (relative to the .builda/export directory)
   */
  path: string;
  /**
   * Should the file contents be rewritten with the default substitutions?
   * https://builda.app/docs/build-a-module/substitutions
   * @default false
   * @optional
   */
  rewrite?: boolean;
  /**
   * Are there any custom substitutions to be made? see (https://builda.app/docs/build-a-module/substitutions)
   * @optional
   */
  substitutions: TSubstitution[];
};

/**
 * See (https://builda.app/docs/build-a-module/registry) for more info
 */
export interface ModuleRegistry {
  /**
   * The name of the module
   */
  name: string;
  /**
   * The module type
   */
  type: 'blueprint' | 'prefab';
  /**
   * The module version number (in semver format)
   * @pattern ^\d+\.\d+\.\d+$
   * @example 1.0.0
   */
  version: string;
  /**
   * If this is a prerelease, set this to true
   * @default false
   * @optional
   */
  prerelease?: boolean;
  /**
   * The url of the module (generally a git repository)
   * You can also use resolver aliases here. See (https://builda.app/docs/resolvers)
   * @example https://github.com/cool-developer/blueprint-cool-module
   */
  url: string;
  /**
   * The module author's details
   * @optional
   */
  author?: {
    /**
     * The author's name
     */
    name: string;
    /**
     * The author's email
     * @optional
     */
    email?: string;
    /**
     * The author's website
     * @optional
     */
    website?: string;
    /**
     * The builda username of the author. This is optional but is required if you want to publish your module to the builda trade store
     * (see (https://builda.app/docs/trade-store))
     * @optional
     */
    buildaUser?: string;
  };
  /**
   * Do you want to publish this module to the builda trade store? (see (https://builda.app/docs/trade-store))
   * @optional
   * @default false
   */
  publishToTradeStore?: boolean;
  /**
   * The module keywords (optional but recommended if you want to publish your module to the builda trade store)
   * @optional
   */
  keywords?: string[];
  /**
   * Is this module looking for funding? If so, you can add a list of funding links here.
   * @optional
   */
  funding?: string[];
  /**
   * If the module is a prefab and requires blueprints or has it's own blueprints, you should add them here
   * if the module is a blueprint, this field is ignored
   * @example "github:cool-developer/blueprint-cool-module@3.0.0"
   * @example "internal:blueprint-name"
   * @optional
   */
  blueprints?: ModuleConfig;
  /**
   * A set of options which will be passed to the module generator when the module has been installed
   * @optional
   */
  generatorOptions?: {
    /**
     * Extra folders which should be created in the module root when the module is installed
     * (Will create any folders which don't already exist in the tree)
     * @optional
     */
    extraFolders?: string[];
    /**
     * Any files which should be copied to the module root when the module is installed in addition
     * to the default files (see (https://builda.app/docs/build-a-module/prefabs#root-files))
     * e.g. .env files
     * @optional
     */
    rootFiles?: Array<string | RootFile>;
    /**
     * Unique to application modules, this is a list of files which should be copied to the application root
     * and if necessary, have substitutions made to them. These files will NOT be copied back into the module
     * export directory.
     */
    applicationOnlyFiles?: RootFile[];
    /**
     * Any global substitutions which should be made to the module files when they are installed
     * (see (https://builda.app/docs/build-a-module/substitutions))
     * @optional
     */
    substitutions?: TSubstitution[];
    /**
     * Any post install scripts which should be run after the module has been installed
     * and all files have been copied across and substitutions made
     * (script paths are relative to the module root and should be in the form of a node cli script)
     */
    postScripts?: string[];
  };
}

export default ModuleRegistry;
