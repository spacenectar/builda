import TSubstitution from './substitution';
import ModuleConfig from './module-config';

type RootFile = {
  /**
   * The path to the root file (relative to the .builda/export directory)
   */
  path: string;
  /**
   * Should the file contents be rewritten with substitutions?
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
   * Any files which should be copied to the app root when the module is installed in addition
   * to the default files (see (https://builda.app/docs/build-a-module/prefabs#root-files))
   * If the module is a blueprint, this will be ignored
   * @optional
   */
  appFiles?: RootFile[];
  /**
   * Any file in this array, will tell builda to look for the same file with a '.unique' extension and copy that to the app root
   * in its place (without the extra extension). This is useful for files which should be unique to each app (like .gitignore) or files which need to extend
   * files from the prefab (like tsconfig.json).
   *
   * Just like the appFiles array, this can be rewritten with substitutions and will be ignored if the module is a blueprint.
   *
   * Note: The items in this array must be actual files and not directories. You do not need to specify the .unique extension here, just ensure that the file exists
   */
  uniqueInstances?: RootFile[];
  /**
   * If this module has any required dependencies, you can add them here
   * @example "react": "^17.0.1"
   * @optional
   */
  dependencies?: {
    [key: string]: string;
  };
  /**
   * If the module is a prefab and requires blueprints or has it's own blueprints, you should add them here
   * if the module is a blueprint, this field is ignored
   * @example "github:cool-developer/blueprint-cool-module@3.0.0"
   * @example "internal:blueprint-name"
   * @optional
   */
  blueprints?: ModuleConfig;
  /**
   * A list of substitutions to make when the module is installed (see (https://builda.app/docs/build-a-module/substitutions))
   * @optional
   */
  substitute?: TSubstitution[];
}

export default ModuleRegistry;
